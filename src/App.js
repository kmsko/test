import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import Table from './components/Table';
import { getUsersThunkCreator, setUsers, setSortUsers, setSettings, setPageCount, } from './redux/table-reducer'



function App(props) {
  const [addUsers, setActiveModAdd] = useState(false);

  let activeModAddUsers = () => {
    setActiveModAdd(!addUsers)
  }


  return (
    <div className="container">
      <header>

        <NavLink className="button" onClick={() => props.getUsersThunkCreator(props.bigData)} to="/table" >big data</NavLink>
        <NavLink className="button" onClick={() => props.getUsersThunkCreator(props.smallData)} to="/table" >small data</NavLink>
       
        <div className="wrapperUserAdd" >
        <button onClick={activeModAddUsers}>Добавить Пользователя</button>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: {
                description: '',
                streetAddress: '',
                city: '',
                state: '',
                zip: ''
              }
            }}
            onSubmit={(values, { setSubmitting }) => {
              props.login()
            }}
          >
            <Form className={addUsers ? `activeModUsersAdd` : `deActiveModUsersAdd`}>
              <div>
                firstName:  <Field placeholder="firstName" type="text" name="firstName" />
          lastName:  <Field placeholder="emlastNameail" type="text" name="emlastNameail" />
          email:  <Field placeholder="email" type="email" name="email" />
          phone:  <Field placeholder="phone" type="tel" name="phone" />
              </div>
              <div>
                Описание  <Field placeholder="description" type="text" name="description" />
          Адрес проживания:  <Field placeholder="streetAddress" type="text" name="streetAddress" />
          Город:  <Field placeholder="city" type="text" name="city" />
          Провинция/штат:  <Field placeholder="state" type="text" name="state" />
          Индекс:  <Field placeholder="zip" type="zip" name="zip" />
              </div>


            </Form>
          </Formik>
        </div>
        <div >



        </div>


      </header>

      <Route path='/table' render={() => <Table
        setSortUsers={props.setSortUsers}
        sortSettings={props.sortSettings}
        setSettings={props.setSettings}
        setUsers={props.setUsers}
        setPageCount={props.setPageCount}
        pageCount={props.pageCount}
        end={props.end}
        portionSize={props.portionSize}
        start={props.start}
        users={props.users}
      />} />

    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    users: state.table.users,
    sortSettings: state.table.sortSettings,
    bigData: state.table.bigData,
    smallData: state.table.smallData,
    start: state.table.start,
    end: state.table.end,
    pageCount: state.table.pageCount,
    portionSize: state.table.portionSize,
  }
}

export default connect(mapStateToProps,
  {
    getUsersThunkCreator,
    setUsers,
    setSortUsers,
    setSettings,
    setPageCount,
  })(App);
