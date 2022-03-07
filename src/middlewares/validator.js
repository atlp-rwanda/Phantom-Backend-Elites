
class Validate{
    loginFields(req, res, next){
        try{
            const checkNull = req.body.email == undefined || req.body.password == undefined ? true : false;

            if(checkNull){
                throw new Error('There is missing field')
            }   
            if(!req.body.email){
                throw new Error('Email field can\'t be empty')
            }
            if(!req.body.password){
                throw new Error('Password field can\'t be empty')
            }
            const isEmailValid =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email);
            if(!isEmailValid){
                throw new Error('You have entered an invalid email address!')
            }
            next()
        }catch(error){
            res.status(400).send({message: error.message})
        }
        
    }
    
    
    userFields(req, res, next){
        const errors = {
            firstName: "",
            lastName: "",
            email: "",
            roleId: "",
            dateofbirth:"",
            gender: "",
            address:"",
        }
        try{
            const checkNull = req.body.email == undefined;

            if(checkNull){
                errors.email = "There is missing field";
            }   
            const isEmailValid =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email);
            if(!isEmailValid){
                errors.email ="You have entered an invalid email address!";
            }
            if(req.body.firstName == undefined || req.body.firstName == ''){
                errors.firstName = "Missing firstname"
            }
            if(req.body.lastName == undefined || req.body.lastName == ''){
                errors.lastName = "Missing lastName"
            }
            if(req.body.roleId == undefined || req.body.roleId == ''){
                errors.roleId = "Missing roleId"
            }
            if(req.body.dateofbirth == undefined || req.body.dateofbirth == ''){
                errors.dateofbirth = "Missing dateofbirth"
            }
            if(req.body.gender == undefined || req.body.gender == ''){
                errors.gender = "Missing gender"
            }
            if(req.body.address == undefined || req.body.address == ''){
                errors.address = "Missing address"
            }
            
            var counter = 0;
            for(var key in errors){
                if(errors[key]!=""){
                    ++counter;
                }else{
                    delete errors[key];
                }
            }
              
            if(counter!=0){
                throw new Error()
            }
            next()
        }catch(error){
            res.status(400).send({errors})
        }
        
    }
}

export default new Validate()