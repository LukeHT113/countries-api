import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header';

export default function Country() {

  const [country, setCountry] = useState<any>([]);
  const [borders, setBorders] = useState<[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const countryName = useParams().countryName;

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      )
      const country = await response.json();
      setCountry(country);
      getBorders(country[0].borders);
      setIsLoading(false);
    }

    fetchCountryData();
  }, [countryName]);

  function getCurrencies(obj: any) {
    let currencies = [];
    for (const key in obj) {
      currencies.push(obj[key].name)
    }
    return currencies.join(', ');
  }

  function getLanguages(obj: any) {
    let languages = [];
    for (const key in obj) {
      languages.push(obj[key])
    }
    return languages.join(', ');
  }

  function getBorders(borders: []) {
    if (!borders) return;
    const text = borders.toString();
    const fetchBorderData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${text}`
      )
      const borders = await response.json()
      setBorders(borders);
    }

    fetchBorderData();
  }

  return (
    <>
      <Header />
      <Link target='_top' to='/'><button className='back-button'>Back</button></Link>
      {isLoading ? <div className='loader-container'><div className="loader"></div></div> :
      country.map((c:any, idx:number) => {
        const nativeNames:any = Object.values(c.name.nativeName)[0];
        return (
          <article className='country' key={idx}>
            <img className='flag' src={c.flags.svg} alt={c.flags.alt} />
            <div className="details">
              <h1>{c.name.common}</h1>
              <h2>Native Name: <span>{nativeNames.common}</span></h2>
              <h2>Population: <span>{c.population.toLocaleString()}</span></h2>
              <h2>Region: <span>{c.region}</span></h2>
              <h2>Sub Region: <span>{c.subregion}</span></h2>
              <h2>Capital: <span>{c.capital ? c.capital.join(', ') : null}</span></h2>
              <h2>Top Level Domain: <span>{c.tld ? c.tld[0] : null}</span></h2>
              <h2>Currencies: <span>{getCurrencies(c.currencies)}</span></h2>
              <h2>Languages: <span>{getLanguages(c.languages)}</span></h2>
              <h2>Border Countries: {borders.map((b: any, idx: number) => <Link target='_top' key={idx} className='border' to={`../countries/${b.name.common}`}>{`${b.name.common} `}</Link>)}</h2>
            </div>
          </article>
        )
      })}
    </>
  )
}
