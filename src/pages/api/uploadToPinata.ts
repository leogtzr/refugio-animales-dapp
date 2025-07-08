import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false,
    },
};

import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const PINATA_API_KEY = process.env.PINATA_API_KEY!;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error parsing form' });

        console.log('files:', files);

        let fileList: FormidableFile[] = [];
        if (Array.isArray(files.file)) {
            fileList = files.file;
        } else if (files.file) {
            fileList = [files.file];
        }

        const cids: string[] = [];

        for (const file of fileList) {
            if (!file || !file.filepath) continue;
            const data = new FormData();
            data.append('file', fs.createReadStream(file.filepath), file.originalFilename);

            const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                    pinata_api_key: PINATA_API_KEY,
                    pinata_secret_api_key: PINATA_API_SECRET,
                    ...data.getHeaders(),
                },
                body: data as any,
            });

            const json = await response.json();
            if (json.IpfsHash) cids.push(json.IpfsHash);
        }

        res.status(200).json({ cids });
    });
}