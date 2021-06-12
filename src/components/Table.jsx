import React, { useEffect, useState } from 'react'

const Table = (props) => {
    // Пагинация 
    const [portionNumber, setPortionNumber] = useState(1)
    let pagination = []
    let portionPaginationSize = 5
    let portionsStart = (portionNumber - 1) * portionPaginationSize + 1;
    let portionsEnd = portionNumber * portionPaginationSize;
    let portionCount = Math.ceil(props.users.length / props.portionSize)


    for (let i = 1; i <= portionCount; i++) {
        pagination.push(i)
    }
    // Сортировка по столбцам 
    let sort = (key) => {
        props.setSettings(key)
        props.setSortUsers(key)
    }
    // Список отрисовываемых строк
    const [userP, setUserP] = useState([props.users.slice(props.start, props.end)])

    let setUsersPortion = (e) => {
        props.setPageCount(e)
        setUserP(props.users.slice(props.start, props.end))
    }

    useEffect(() => {
        setPortionNumber(1)
    }, [props.users.length])

    useEffect(() => {
        setUserP(props.users.slice(props.start, props.end))
    }, [props.pageCount, props.users])

    const [activeDesc, setActiveDesc] = useState(false)
    const [userDesc, setUserDesc] = useState({})

    let descriptionActive = (u) => {
        setActiveDesc(true)
        setUserDesc(u)
    }
    const [search, setSearch] = useState('')


    let setSearchValue = (e) => {
        setSearch(e.currentTarget.value)
    }
    let filterSearch = () => {
        let filterS = props.users.filter(el => el.id === Number(search))
        setUserP(filterS)
    }





    return <div>

        <div className="pagination">

            <button disabled={portionNumber <= 1} onClick={() => setPortionNumber(portionNumber - 1)}> prev </button>
            {pagination.slice(portionsStart - 1, portionsEnd).map(e => <span
                className={`${`button_pagination`} ${props.pageCount === e && 'button_pagination__active'}`}
                onClick={() => setUsersPortion(e)}>
                {e} </span>)}
            <button disabled={portionsEnd >= pagination.length} onClick={() => setPortionNumber(portionNumber + 1)} >next</button>
        </div>
        <div>
            search
            <input type="search" onChange={setSearchValue} value={search} />
            <button onClick={filterSearch} >search</button>
        </div>
  
        <table>

            <thead>

                <tr>
                    <th className="button_id" onClick={() => sort(`sortId`)}>id</th>
                    <th className="button_id" onClick={() => sort(`sortFirstName`)}>firstName</th>
                    <th className="button_id" onClick={() => sort(`sortLastName`)}>lastName</th>
                    <th className="button_id" onClick={() => sort(`sortEmail`)}>email</th>
                    <th className="button_id" onClick={() => sort(`sortPhone`)}>phone</th>
                </tr>
            </thead>

            <tbody>



                {userP.map(u => <tr onClick={() => descriptionActive(u)} >
                    <th>{u.id}</th>
                    <th>{u.firstName}</th>
                    <th>{u.lastName}</th>
                    <th>{u.email}</th>
                    <th>{u.phone}</th>
                </tr>
                )}
            </tbody>
            {activeDesc && <tfoot>
                <div>Выбран пользователь <b>{userDesc.firstName} {userDesc.lastName} </b></div>
                <div>Описание: <textarea className="textarea_desc" value={userDesc.description}></textarea></div>
                <div>Адрес проживания: <b>{userDesc.address.streetAddress}</b></div>
                <div>Город: <b>{userDesc.address.city}</b></div>
                <div>Провинция/штат: <b>{userDesc.address.state}</b></div>
                <div>Индекс: <b>{userDesc.address.zip}</b></div>
            </tfoot>}

        </table>
    </div>
}
export default Table