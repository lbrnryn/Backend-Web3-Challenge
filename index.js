const app = require('express')();
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');

app.get('/nft/:walletAddress', async (req, res) => {

    await Moralis.start({ apiKey: '5coL5XL5QTxdGDwIBqhffct0v35AVvweja8StEPfEW0wkR6CCHphhZlIjXywwXiO' });

    // const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
    const address = req.params.walletAddress;

    const chains = [ EvmChain.ETHEREUM, EvmChain.BSC, EvmChain.POLYGON ];

    try {
        const allNFTsPromises = chains.map(async (chain) => {
            const data = await Moralis.EvmApi.nft.getWalletNFTs({ address, chain });
            return data;
        });
    
        // console.log(allNFTsPromises);
        const allNFTs = await Promise.all(allNFTsPromises);
    
        res.json(allNFTs);
        
    } catch (err) { res.status(500).json({ error: 'Error occured while fetching data' }) }

});

app.get('/balance/:walletAddress', async (req, res) => {
    
    await Moralis.start({ apiKey: '5coL5XL5QTxdGDwIBqhffct0v35AVvweja8StEPfEW0wkR6CCHphhZlIjXywwXiO' });

    const address = req.params.walletAddress;

    const chain = EvmChain.ETHEREUM;

    try {
        const data = await Moralis.EvmApi.balance.getNativeBalance({ address, chain });

        res.json(data);

    } catch (err) { res.status(500).json({ error: 'Error occured while fetching data' }) }

});

app.listen(1000, () => console.log('Server running on port: 1000'));
