import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import Header from "../components/Header"

export default function Homepage() {

  const [searchQuery, setSearchQuery] = useState('');
  const [regionQuery, setRegionQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region`
      )
      let countries = await response.json()
      setCountries(
        countries.sort(function(a: any, b: any) {
          const nameA: string = a.name.common;
          const nameB: string = b.name.common;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0
        })
      );
      setIsLoading(false)
    }

    fetchCountryData();
  }, [])

  function onSearchQueryChange(e: any) {
    setSearchQuery(e.target.value);
  }

  function onRegionQueryChange(e: any) {
    setRegionQuery(e.target.value);
  }

  return (
    <>
      <Header />
      <section className="search-container">
        <input placeholder="Search for a country..." className="searchbar" value={searchQuery} onChange={e => onSearchQueryChange(e)} />
        <select className="filter" value={regionQuery} onChange={e => onRegionQueryChange(e)}>
          <option value='' disabled>Filter by region</option>
          <option value=''>All</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Antarctic'>Antarctic</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </section>
      {isLoading ? 
      <div className="loader-container">
        <div className="loader"></div>
      </div> :

      searchQuery.length === 0 && !regionQuery ?
      <section className="countries">
        {countries.map((c, idx) => {
          const {
            flags,
            name,
            population,
            region,
            capital,
          }: any = c;
          return (
            <Link target="_top" key={idx} to={`/countries/${(name.common).toLowerCase()}`}>
              <article className="country-card">
                <img className="flag" src={flags.png} alt={flags.alt} />
                <div className="details">
                  <h4 className="name">{name.common}</h4>
                  <h4>Population: <span>{population.toLocaleString()}</span></h4>
                  <h4>Region: <span>{region}</span></h4>
                  <h4>Capital: <span>{capital[0] ? capital.join(', ') : capital}</span></h4>
                </div>
              </article>
            </Link>
            )
          })}
      </section> 
      : 
      <section className="countries">
        {countries.map((c, idx) => {
          const {
            flags,
            name,
            population,
            region,
            capital,
          }: any = c;
        
          return (
            name.common.toUpperCase().includes(searchQuery.toUpperCase()) && (region.toUpperCase() === regionQuery.toUpperCase() || !regionQuery) ? <Link target="_top" key={idx} to={`/countries/${(name.common).toLowerCase()}`}>
              <article className="country-card">
                <img className="flag" src={flags.png} alt={flags.alt} />
                <div className="details">
                  <h4 className="name">{name.common}</h4>
                  <h4>Population: <span>{population.toLocaleString()}</span></h4>
                  <h4>Region: <span>{region}</span></h4>
                  <h4>Capital: <span>{capital[0] ? capital.join(', ') : capital}</span></h4>
                </div>
              </article>
            </Link> : null
            )
          })}
      </section>}
    </>
  )
}
