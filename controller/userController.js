let userTable = require('../models/user-models');

const contact_add = async (req, res) => {
    let errors = []
    let response = {}

    if (req.body.name == '') {
        errors.push('Name is required!')
    }
    if (req.body.email == '') {
        errors.push('Email Address is required!')
    }
    if (req.body.phone == '') {
        errors.push('Phone Number is required!')
    }

    if (errors.length == 0) {
        let data = req.body;
        let name = data.name;
        let email = data.email;
        let phone = data.phone;
        let user_data = {
            'name': name,
            'email': email,
            'phone': phone,
        }

        let user = new userTable(user_data);

        if (user.save()) {
            //console.log('Register Form', user)
            response.is_success = true
            response.message = 'submit successfully'
        }
        else {
            response.is_success = false
            response.errors = 'somthing went wrong'

        }

    } else {
        response.is_failed = false
        response.errors = errors
    }
    res.send(JSON.stringify(response))
}

const contact_update = async (req, res) => {
    let errors = [];
    let response = {};

    let data = req.body;
    let name = data.name;
    let email = data.email;
    let phone = data.phone;
    if (errors.length == 0) {
        let id = req.body.id;
        let data1 = await userTable.findOne({ '_id': id })
        data1.name = name;
        data1.email = email;
        data1.phone = phone;

        if (data1.save()) {
            //console.log(data1);
            response.is_success = true;
            response.data = data1;
            response.message = 'updated successfully'
        } else {
            response.is_success = false;
            response.error = 'Sorry, data is not available!';
        }

    } else {
        response.is_success = false
        response.error = 'something went wrong. please try again!'
    }
    return res.json(response)
}

const contact_delete = async (req, res) => {
    let errors = [];
    let response = {};

    if (errors.length == 0) {
        try {
            let id = req.body.id;
            let deleteResult = await userTable.deleteOne({ '_id': id });

            if (deleteResult.deletedCount > 0) {
                response.is_success = true;
                response.message = 'User deleted successfully.';
            } else {
                response.is_success = false;
                response.error = 'Sorry, user with the provided ID not found.';
            }
        } catch (error) {
            console.error(error);
            response.is_success = false;
            response.error = 'Internal server error.';
        }

    } else {
        response.is_success = false;
        response.error = 'Something went wrong. Please try again!';
    }

    return res.json(response);
}

const contact_detail = async (req, res) => {
    let errors = [];
    let response = {};
    if (errors.length == 0) {
        let id = req.body.id;
        let userDetail = await userTable.findOne({ '_id': id })
        if (userDetail) {
            //console.log(userDetail);
            response.is_success = true;
            response.data = userDetail;
        } else {
            response.is_success = false;
            response.error = 'Sorry, data is not available!';
        }

    } else {
        response.is_success = false
        response.error = 'something went wrong. please try again!'
    }
    return res.json(response)
}

const total_contact = async (req, res) => {
    let errors = [];
    let response = {};
    if (errors.length == 0) {
        let usersDetail = await userTable.find({})
        if (usersDetail) {
            //console.log(userDetail);
            response.is_success = true;
            response.data = usersDetail;
        } else {
            response.is_success = false;
            response.error = 'Sorry, data is not available!';
        }

    } else {
        response.is_success = false
        response.error = 'something went wrong. please try again!'
    }
    return res.json(response)
}

const search = async (req, res) => {
    
        let errors = [];
        let response = {};
        if (errors.length == 0) {
            let search = req.body.search
           const Users = await userTable.find({name: { $regex: '.*' + search + '.*' }});
   
            if (Users) {
                //console.log(Users)
                response.is_success = true
                response.data = Users;
    
            } else {
                response.is_success = false
                response.error = 'sorry,Data is not available !'
    
            }
        } else {
            response.is_success = false
            response.error = 'something went wrong. please try again!'
        }
        return res.json(response)
    
}




module.exports = {
    'contact_add': contact_add,
    'total_contact': total_contact,
    'contact_update': contact_update,
    'contact_delete': contact_delete,
    'contact_detail': contact_detail,
    'search': search
}