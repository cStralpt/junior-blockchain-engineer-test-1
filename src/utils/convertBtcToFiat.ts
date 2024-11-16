type TBitcoinPriceIndex = {
    time: {
        updated: string;
        updatedISO: string;
        updateduk: string;
    };
    disclaimer: string;
    chartName: string;
    bpi: {
        USD: {
            code: string;
            symbol: string;
            rate: string;
            description: string;
            rate_float: number;
        };
        GBP: {
            code: string;
            symbol: string;
            rate: string;
            description: string;
            rate_float: number;
        };
        EUR: {
            code: string;
            symbol: string;
            rate: string;
            description: string;
            rate_float: number;
        };
    };
};

type TExchangeRates = {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: {
        [currency: string]: number;
    };
};

export default async function convertBtcToFiat(amount: number): Promise<number | undefined> {
    let btcInIdr: undefined | number;
    try {
        const sendReqForBtcPrice = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
        const btcPriceRates: TBitcoinPriceIndex = await sendReqForBtcPrice.json()
        // for speed up development process i hardcoded the API key.
        // in real coding i usually store any API key in .env file
        const sendReqForCurrencyConversion = await fetch(`https://api.exchangeratesapi.io/latest?access_key=b0326c77c6ef7cf42f59ab9a3cd7428f`)
        const exchangeRates: TExchangeRates = await sendReqForCurrencyConversion.json()
        console.log({ exchangeRates })
        console.log({ btcPriceRates })
        const btcPriceInIdr = btcPriceRates.bpi.EUR.rate_float * amount * exchangeRates.rates["IDR"]
        console.log({ btcPriceInIdr })
        btcInIdr = btcPriceInIdr

    } catch (error) {
        console.error(error)
    }
    return btcInIdr
}
