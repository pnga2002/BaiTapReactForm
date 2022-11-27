import React, { Component } from 'react'

export default class TableNguoiDung extends Component {
  render() {
    const {arrNguoiDung,handleDelete,handleEdit}= this.props;
    return (
      <table className="table">
        <thead className="bg-dark text-white">
          <tr>
            <th>Mã SV</th>
            <th>Họ Tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrNguoiDung.map(({masv,hoten,sdt,email},index)=>{
            return <tr key={index}>
              <td>{masv}</td>
              <td>{hoten}</td>
              <td>{sdt}</td>
              <td>{email}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>{
                  handleDelete(masv);
                }}>Xóa</button>
              </td>
              <td>
              <button className="btn btn-danger" onClick={()=>{
                          let proEdit={masv,hoten,sdt,email}
                          handleEdit(proEdit)
                          console.log(proEdit)
                        }}>Sửa</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}
