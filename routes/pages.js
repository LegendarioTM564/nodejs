const express = require ('express')
const router = express.Router()
const getData = require ('../settings/api')
const authController = require ('../controllers/auth')


router.get("/", authController.isAuthenticated, (req,res)=>{
    
        getData().then(products =>{
                
            res.render("home",{ 
                layout:"main",
                products:products
            }); 
        })
            
});

router.get('/register', (req,res) =>{

    res.render('register',{
        layout:'main'
    })

})

router.get('/login', (req,res) =>{

    res.render('login',{
        layout:'main'
    })

})

router.get('/logOut', authController.logOut)

module.exports=router