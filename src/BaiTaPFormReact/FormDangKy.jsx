import React, { Component } from 'react'

import TableNguoiDung from './TableNguoiDung'
export default class FormDangKy extends Component {
  state ={
    formValue:{
      masv:'',
      hoten:'',
      sdt:'',
      email:''
  },
  formError:{
    masv:'',
    hoten:'',
    sdt:'',
    email:''
  },
  valid : false,
    arrNguoiDung:[
      {masv:'1',hoten:'Ho Thi Phuong Nga', sdt:'0999999999', email:'nga@gmail.com'},
      {masv:'2',hoten:'Ho Thi Phuong Ngan', sdt:'0999999998', email:'ngan@gmail.com'}
    ]
  }
  
  handleUpdate=()=>{
    // console.log('first')
    let{arrNguoiDung,formValue} = this.state;
    let nguoiDung = arrNguoiDung.find(pro=>pro.masv===formValue.masv)
    if(nguoiDung){
      for(let key in nguoiDung){
        if(key!=='id'){
          nguoiDung[key]=formValue[key] 
        }
      }
    }
    //câp nhật state
    this.setState({
      arrNguoiDung:arrNguoiDung
    })
  }
  checkFormValid=()=>{
    //return true| false true khi form hop le false khi form khong hop le
    /**
     * form hop lekhi cac truong formError=rỗng, và cá trường value tương ứng khác rỗng
     * 
     */
    let {formError,formValue}=this.state;
    for(let key in formError){
        if(formError[key] !== '' || formValue[key]===''){
            return false;
        }
    }
    return true;
}
handleEdit=(prodClick)=>{
  this.setState({
      formValue:prodClick
  },()=>{
      this.setState({
          valid:this.checkFormValid()
      })
  // console.log(formValue)
  })
}
  handleDelete=(idClick)=>{
    let arrNguoiDung = this.state.arrNguoiDung.filter(prod=>prod.masv!==idClick);
    this.setState({
      arrNguoiDung:arrNguoiDung
    })
  } 
  handleSunbmit=(e)=>{
    //nagn su kien reload browser
    let {arrNguoiDung,formValue} = this.state;
    e.preventDefault();
    console.log('submit',this.state.formValue)
    if(!this.checkFormValid()){
      alert("Form is invalid")
      return;//neu forom khong hop le khong submit
    }
    let prodcreate= arrNguoiDung.find(pro=>pro.masv===formValue.masv)
    console.log(prodcreate)
        if(prodcreate){
            // prodUpdate.name=formValue.name
            alert('mã sinh viên đã tồn tại')
        }
        else{
          arrNguoiDung.push(this.state.formValue);
          this.setState({
            arrNguoiDung:arrNguoiDung
          })
        }
  
  
}
  handleChange=(e)=>{
    // lấy giá trị mỗi lần value inout thay đổi bởi người dùng
    let tagInput = e.target;
    let {name,value} = tagInput;
    let dataType = tagInput.getAttribute('data-type');
    let dataMaxLenght = tagInput.getAttribute('data-max-lenght');
    
    //lay obj form value ra xu ly rieng
    let newFormValue = this.state.formValue;
    newFormValue[name] = value;

    /**xu ly cho error */
    let newFormError = this.state.formError;
    let message = '';
    if(value.trim() === ''){
        message =name +' cannot be blank';
    }
    else{
      if(dataType=='email'){
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!regexEmail.test(value)){
          message = name +'is invalid';
        }
      }
        if(dataType=='number'){
            let regexNumber=/^\d+$/;
            if(!regexNumber.test(value)){
                message = name +'is invalid';
            }
        }
        
        if(dataMaxLenght!==null && value.length>dataMaxLenght){
            message = name+` no more than ${dataMaxLenght} character !`
        }
    }
    newFormError[name]=message;
    this.setState({
      [name]:value,
      formError:newFormError,
      formValue:newFormValue
    },()=>{
      this.setState({
        valid:this.checkFormValid()
      })
    })
  }
render() {
  let {formValue}=this.state;
return <>
    <form className='container'onSubmit={this.handleSunbmit}>
        <div className='card'>
            <div className='card-header'>User infor</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <p>MÃ SV</p>
                            <input value={formValue.masv} data-max-lenght='6' type="text" className='form-control' name='masv' onInput={this.handleChange} />
                            {this.state.formError.masv && <div className="alert alert-danger mt-2">{this.state.formError.masv}</div>}
                        </div>
                        <div className="form-group">
                            <p>Số điện thoại</p>
                            <input value={formValue.sdt}  data-type='number' type="text" className='form-control' name='sdt'onInput={this.handleChange}/>
                            {this.state.formError.sdt && <div className="alert alert-danger mt-2">{this.state.formError.sdt}</div>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <p>Họ tên</p>
                            <input  value={formValue.hoten}  type="text" className='form-control' name='hoten'onInput={this.handleChange}/>
                            {this.state.formError.hoten && <div className="alert alert-danger mt-2">{this.state.formError.hoten}</div>}
                        </div>
                        <div className="form-group">
                            <p>Email</p>
                            <input  value={formValue.email}  data-type='email' type="text" className='form-control' name='email'onInput={this.handleChange}/>
                            {this.state.formError.email && <div className="alert alert-danger mt-2">{this.state.formError.email}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <button type='submit' className="btn btn-success m-2" 
                >Create</button>
                <button type='button' className="btn btn-primary m-2" onClick={()=>{
                  this.handleUpdate()
                }}>Update</button>
            </div>
        </div>
        
    </form>
    <div className="container mt-2">
      <TableNguoiDung arrNguoiDung={this.state.arrNguoiDung} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
    </div>
    
</>
}
}
