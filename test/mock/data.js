const roles = [{
    id: 2,
    name:"driver"
},{
    id: 3,
    name: "operator"
}]

const users = [
    {
        firstName: "john",
        lastName: "smith",
        email: "nkrmoise@gmail.com",
        roleId: 3,
        dateofbirth:"2020-1-1",
        gender: "male",
        address:"kigali"
    }
    ,
    {
        firstName: "jane",
        lastName: "janet",
        email: "moiseninyokuru1@gmail.com",
        roleId: 2,
        dateofbirth:"2020-1-1",
        gender: "male",
        address:"kigali"
    }
]

export default {roles, users}