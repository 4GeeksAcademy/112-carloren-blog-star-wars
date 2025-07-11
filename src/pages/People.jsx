import { useEffect, useState } from "react";
import { PeopleCard } from "../components/PeopleCard";
import { Link, useParams } from "react-router-dom";
import { getPeopleImages } from "../services/StarWarsImages";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getName } from "../services/StarWarsServices";

export const People = () => {

    const { store, dispatch } = useGlobalReducer()

    if (useParams().id != null) {

        if (useParams().id === "all") {
            return (
                <div className="container d-flex flex-column text-center mt-5">
                    <h2 className="text-info long-time-ago">Personajes de la saga</h2>
                    <div className="row justify-content-center gx-3">
                        {store.swPeople.map((person, i) => (<PeopleCard key={i} uid={person.url.match(/(\d+)/)[0]} index={i} />))}
                    </div>
                    <Link className="btn btn-outline-info mx-auto mt-3" to="/people">Vista de páginas</Link>
                    <a className="btn btn-warning mx-auto mt-3" href="#">Volver arriba</a>
                </div>
            )
        }

        const person = store.swPeople.find((item) => item.uid === useParams().id)

        const button = (store.favorites.find((item) => item.url === "/people/" + person.uid) != null) ?
            (<button className="btn btn-danger my-3 mx-auto" onClick={() => addFavorite(person.name, person.uid)}>Quitar de favoritos <i className="fa-solid fa-heart"></i></button>)
            :
            (<button className="btn btn-outline-danger my-3 mx-auto" onClick={() => addFavorite(person.name, person.uid)}>Añadir a favoritos <i className="fa-regular fa-heart"></i></button>)



        function addFavorite(name, id) {
            if (store.favorites.find((item) => item.url === "/people/" + id) != null) {
                dispatch({ type: "get_favorites", payload: store.favorites.filter((favitem) => favitem.url != "/people/" + id) })

            } else {
                dispatch({ type: "get_favorites", payload: store.favorites.concat({ group: "people", name: name, url: "/people/" + id, id: id }) })
            }
        }

        return (
            <div className="detail-box container d-flex flex-column border border-white mt-5 rounded bg-black p-0">
                <div className="position-relative">
                    <img className="rounded-top w-100 detail-image" src={getPeopleImages(person.uid)} />
                    <h1 className="detail-title ps-4 position-absolute bottom-0">{person.name}</h1>
                </div>
                <div className="container row row-cols2">
                    <p className="col-6 fs-2 ps-4">Nacimiento: {person.birth_year}</p>
                    <p className="col-6 fs-2 ps-4">Planeta natal: {getName(person.homeworld, store.swPlanets)}</p>
                    <p className="col-6 fs-2 ps-4">Género: {person.gender}</p>
                    <p className="col-6 fs-2 ps-4">Piel: {person.skin_color}</p>
                    <p className="col-6 fs-2 ps-4">Altura: {person.height}cm</p>
                    <p className="col-6 fs-2 ps-4">Peso: {person.mass}kg</p>
                    <p className="col-6 fs-2 ps-4">Pelo: {person.hair_color}</p>
                    <p className="col-6 fs-2 ps-4">Ojos: {person.eye_color}</p>
                </div>
                <div className="divider mx-5"></div>
                {button}
            </div>
        )
    } else {

        const [pageNumber, setPageNumber] = useState([])
        const [pages, setPages] = useState([])

        function getPages() {
            let tempPageNumber = []
            let tempPages = []
            for (let index = 0; index < (store.swPeople.length) / 9; index++) {
                tempPageNumber = (tempPageNumber.concat(
                    <li key={"number" + index} className="nav-item" role="presentation">
                        <button className={(index === 0) ? "mx-1 nav-link nav-page active" : "mx-1 nav-link nav-page"} id={"page-" + (index + 1) + "-tab"} data-bs-toggle="pill" data-bs-target={"#page-" + (index + 1)}
                            type="button" role="tab" aria-controls={"page-" + (index + 1)} aria-selected="true">
                            {index + 1}
                        </button>
                    </li >
                )
                )
                tempPages = (tempPages.concat(
                    <div key={"page" + index} className={(index === 0) ? "tab-pane fade show active" : "tab-pane fade"} id={"page-" + (index + 1)} role="tabpanel"
                        aria-labelledby={"page-" + (index + 1) + "-tab"} tabIndex={index}>
                        <div className="row justify-content-center gx-3">
                            {store.swPeople.map((person, i) => {
                                if (i >= 9 * (index) && i < 9 * (index + 1)) {
                                    return (<PeopleCard key={i} uid={person.url.match(/(\d+)/)[0]} index={i} />)
                                }
                            })}
                        </div>
                    </div>
                )
                )
            }
            setPageNumber(tempPageNumber)
            setPages(tempPages)
        }

        useEffect(() => {
            getPages()
        }, [])

        return (
            <div className="container d-flex flex-column text-center mt-5">
                <h2 className="text-info long-time-ago">Personajes de la saga</h2>
                <div className="tab-content" id="pills-tabContent">
                    {pages}
                </div>
                <ul className="nav nav-pills mt-3 mx-auto" id="pills-tab" role="tablist">
                    {pageNumber}
                </ul>
                <Link className="btn btn-outline-info mx-auto mt-3" to="/people/all">Vista completa</Link>
                <a className="btn btn-outline-warning mx-auto mt-3" href="#">Volver arriba</a>
            </div>
        )
    }
}