# Currencies to CSV

-   Renders a CSV containing the last converted currencies in day time series.
-   The latest 5 days of the currencies are fetched.

# Setup

```bash
npm i
cp .env.sample .env
# fill in necessary values in .env
node main.js
```

# .env sample

```
ACCESS_KEY=your-ultra-secret-access-key
BASE=EUR
SYMBOLS=EUR,USD,AUD
```

# References

-   get api key from [exchangerates dashboard](https://manage.exchangeratesapi.io/dashboard)
-   [api endpoint](https://api.exchangeratesapi.io/v1/2013-12-24?access_key=API_KEY&base=GBP&symbols=USD,CAD,EUR)
-   [api documentation](https://exchangeratesapi.io/documentation/)
