import React, { Component } from 'react'
import uuid from "uuid";
import App from './App.css';


class Todo extends Component {

    constructor(props) {
        super(props)

        this.input=React.createRef()
        this.state={
            list:[],
        }
    }

    addTask=()=>{

        const Items={
            id:uuid.v4(),
            value:this.input.current.value,
            Date: new Date().toUTCString()
        };

        if(localStorage.getItem('list')==null){
            const list=[]
            list.push(Items);
            localStorage.setItem("list",JSON.stringify(list))
        }
        else{
            const list=JSON.parse(localStorage.getItem('list'))
            list.push(Items)
            localStorage.setItem("list",JSON.stringify(list))
        }
        this.setState({
            list:JSON.parse(localStorage.getItem('list'))
        });
    }

    componentDidMount() {
        const list = window.localStorage.getItem('list');
        const parsedList = JSON.parse(list);
        if(list == null){
            return false
        }
        else{
            this.setState({
                list: parsedList,
            })
            console.log(this.state.list);
        }
    }

    deleteItem=(event)=> {

        let index = event.target.getAttribute('data-key')
        let listValue=JSON.parse(localStorage.getItem('list'));
        listValue.splice(index,1)
        this.setState({list:listValue});
        localStorage.setItem('list',JSON.stringify(listValue))
    }



    render() {
        return (

                <div>
                    <div id="addTask">
                        <div className="row pt-5">
                            <div className="col-md-8 col-sm-8 col-xs-8">
                                <input className="form-control" type="text" placeholder="What do you have to do?"
                                       ref={this.input}></input>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <button onClick={this.addTask} className="btn btn-info" style={{width: "100%"}}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div id="showTask">
                        <div className="row pt-3 px-3">
                            <div className="col-md-12 col-sm-12 col-xs-12 border border-secondary py-3">

                                    {
                                        this.state.list.map((item,index)=>
                                        {
                                            return(

                                                <div className="row pt-3 px-3 mx-3 my-3 shadow-ng" key={item.id}>
                                                    <div className="col-md-8 col-sm-8 col-xs-8 col-12">
                                                        <p>{item.value}</p>
                                                    </div>
                                                    <div className="col-md-3 col-sm-3 col-xs-3 col-8">
                                                        <div className="custom-control custom-switch pt-2" style={{paddingLeft: "0px!important"}}>
                                                            <span>Edit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                            <input type="checkbox" className="custom-control-input" id={item.id} />
                                                            <input type="checkbox" className="custom-control-input" value={item.id} id={item.id} style={{display: "none"}} />
                                                            <label className="custom-control-label"
                                                                   htmlFor={item.id}></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 col-sm-1 col-xs-1 col-1 mt--2 pb-2">

                                                        <button data-key={index} onClick={this.deleteItem} style={{borderRadius: "50%"}} >
                                                            <i className="fa fa-trash del-icon" aria-hidden="true"></i>
                                                        </button>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                            </div>
                         </div>

                    </div>
                </div>

        )
    }
}

export default Todo
