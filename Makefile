.DEFAULT_GOAL := build

SMART_CONTRACT_PATH=src/RefugioAnimal.sol

build:
	forge build ${SMART_CONTRACT_PATH}

clean:
	forge clean

test:
	forge test

cover:
	forge coverage

run:
	npm run dev

