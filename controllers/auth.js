const pool = require ('../settings/dataBase');
const bcrypt = require ('bcryptjs')
const jwt  = require ('jsonwebtoken')
const dotenv = require ('dotenv').config()
const { promisify } = require ('util')


exports.register = async (req,res) => {
    
    try {
        
    const { nombre, password, email, confirmePassword } = req.body
    
    let passwordHass = await bcrypt.hash(password,8);
    
    pool.query('SELECT email FROM usuario WHERE email = ?' , [email], (error,results) =>{
        
        if (error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register',{
                layout:'main',
                message: 'El mail ya esta en uso'
            })
        }if ( password !== confirmePassword){
            return res.render('register',{
                layout:'main',
                message: 'Las contraseñas no coinciden'
                
        })
        }
        
        pool.query('INSERT INTO usuario SET ?', {nombre:nombre,email:email,password:passwordHass}, (error,results) =>{
            
            if(error){
                console.log(error);
            } else {
                return res.redirect ('/')
            }
        })
    })
} catch (error) {
        console.log(error);
}
    
}

exports.login = async (req,res) =>{

    try {
        
        const { email, password} = req.body
     
    if (!email || !password){
        return res.render('login',{
            layout:'main',
            messageLogin: 'Debes completar los campos'
        })
    }else{ 
        pool.query('SELECT * FROM usuario WHERE email = ?', [email], async (error,results) =>{
           
            if(results?.length > 0){ 
                
                const comparacion = await bcrypt.compare (password, results[0].password)
                
                if(!comparacion){
                    return res.render('login',{
                    layout:'main',
                    messageLogin: 'Los datos ingresados no coinciden, vuelve a intentarlo.'
                });
                }else{
                    const id = results[0].id
                    const token = jwt.sign({id:id},"" + process.env.JWT_SECRET,{
                        expiresIn: "1h"
                    })
    
                    const cookieOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOCKIE_EXP * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt',token, cookieOptions)
                    res.redirect('/')
                }
                return;
            }
        })
    }     

    } catch (error) {
        console.log(error);
    }

}

exports.isAuthenticated = async (req, res, next)=>{

    if(req.cookies.jwt){
        try {
            
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
            
            pool.query('SELECT * FROM usuario WHERE id = ?', [decodificada.id], (error,results) =>{
                if(results){return next()}
                req.user = results[0]
                return next()
            } )

        } catch (error) {
            console.log(error);
            return next()
        }
    }else {
        res.redirect('/login')
    }
}

exports.logOut = (req,res) =>{

    res.clearCookie('jwt')
    return res.redirect ('/login')
}
