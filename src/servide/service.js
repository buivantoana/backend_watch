import axios from "axios"
const login = (data) => {
   
 return axios.post('http://localhost:8080/login',data)

}
const checklogin = (token) => {
 return axios.post(`http://localhost:8080/checklogin`,token)

}
// category
const category = (category) => {
 return axios.post(`http://localhost:8080/category`,category)

}
const categoryupdate = (category) => {
 return axios.post(`http://localhost:8080/categoryupdate`,category)

}
const categoryall = () => {
 return axios.get(`http://localhost:8080/categoryall`)

}

const categoryfix = (id) => {
 return axios.post(`http://localhost:8080/categoryfix`,id)

}
const categorydestroy = (id) => {
 return axios.post(`http://localhost:8080/categorydestroy`,id)

}

// brand
const brand = (category) => {
 return axios.post(`http://localhost:8080/brand`,category)

}
const brandupdate = (category) => {
 return axios.post(`http://localhost:8080/brandupdate`,category)

}
const brandall = () => {
 return axios.get(`http://localhost:8080/brandall`)

}

const brandfix = (id) => {
 return axios.post(`http://localhost:8080/brandfix`,id)

}
const branddestroy = (id) => {
 return axios.post(`http://localhost:8080/branddestroy`,id)

}


// product
const getallcategory = () => {
 return axios.get(`http://localhost:8080/getallcategory`)
}
const getallbrand = () => {
 return axios.get(`http://localhost:8080/getallbrand`)
}

const creatproduct = (data) => {
 return axios.post(`http://localhost:8080/creatproduct`,data)
}
const getallproduct = (type) => {
 return axios.post(`http://localhost:8080/getallproduct`,type)
}
const gettypeproduct = (type) => {
 return axios.post(`http://localhost:8080/gettypeproduct`,type)
}
const getalltypeproduct = (type) => {
 return axios.post(`http://localhost:8080/getalltypeproduct`,type)
}
const getalltypeproductbrand = (type) => {
 return axios.post(`http://localhost:8080/getalltypeproductbrand`,type)
}
const searchproduct  = (type) => {
 return axios.post(`http://localhost:8080/searchproduct `,type)
}
const updateproduct  = (type) => {
 return axios.post(`http://localhost:8080/updateproduct `,type)
}
const deleteproduct  = (type) => {
 return axios.post(`http://localhost:8080/deleteproduct `,type)
}
const getcountproduct  = () => {
 return axios.get(`http://localhost:8080/getcountproduct `)
}

// detail
const creatdetail = (data) => {
 return axios.post(`http://localhost:8080/creatdetail`,data)
}
const getalldetail = (type) => {
 return axios.post(`http://localhost:8080/getalldetail`,type)
}

// custumer
const custumer = (type) => {
 return axios.post(`http://localhost:8080/custumer`,type)
}
const custumerlogin = (type) => {
 return axios.post(`http://localhost:8080/custumerlogin`,type)
}

// cart
const cart = (type) => {
 return axios.post(`http://localhost:8080/cart`,type)
}
const getcart = (type) => {
 return axios.post(`http://localhost:8080/getcart`,type)
}
const deletecart = (type) => {
 return axios.post(`http://localhost:8080/deletecart`,type)
}
const getcartupdate = (type) => {
 return axios.post(`http://localhost:8080/getcartupdate`,type)
}

// order
const order = (type) => {
 return axios.post(`http://localhost:8080/order`,type)
}
const getorder = (type) => {
 return axios.post(`http://localhost:8080/getorder`,type)
}
const updateorder = (type) => {
 return axios.post(`http://localhost:8080/updateorder`,type)
}
const deleteorder = (type) => {
 return axios.post(`http://localhost:8080/deleteorder`,type)
}
// star
const star = (type) => {
 return axios.post(`http://localhost:8080/star`,type)
}
const getstar = () => {
 return axios.get(`http://localhost:8080/getstar`)
}
// whitlist
const whitlist = (type) => {
 return axios.post(`http://localhost:8080/whitlist`,type)
}
const getallwhitlist = (type) => {
 return axios.post(`http://localhost:8080/getallwhitlist`,type)
}
const deletewhitlist = (type) => {
 return axios.post(`http://localhost:8080/deletewhitlist`,type)
}

// comment
const comment = (type) => {
 return axios.post(`http://localhost:8080/comment`,type)
}
const getcomment = (type) => {
 return axios.post(`http://localhost:8080/getcomment`,type)
}
const deletecomment = (type) => {
 return axios.post(`http://localhost:8080/deletecomment`,type)
}
// panigation
const pagination = (page) => {
         return axios.post(`http://localhost:8080/pagination?page=${page}`)

}

export  {
    login,
    checklogin,
    category,
    categoryall,
    categoryfix,
    categoryupdate,
    categorydestroy,
     brand,
    brandall,
    brandfix,
    brandupdate,
    branddestroy,
    getallcategory,
    getallbrand,
    creatproduct,
    getallproduct,
    creatdetail,
    getalldetail,
    custumer,
    custumerlogin,
    cart,
    getcart,
    getcartupdate,
    order,
    getorder,
    star,
    getstar,
    deletecart,
    deleteorder,
    gettypeproduct,
    getalltypeproduct,
    getalltypeproductbrand,
    searchproduct,
    getcountproduct,
    whitlist,
    getallwhitlist,
    deletewhitlist,
    comment,
    getcomment,
    deletecomment,
    pagination,
    updateproduct,
    deleteproduct,
    updateorder
}