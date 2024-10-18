const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requieLogin')
module.exports = app => {
   
    
    app.post('/api/stripe',requireLogin, async (req,res) => {

        // if(!req.user){
        //     return res.status(401).send({error:'You must log in!'});
        // }
        const stripeAddress =  {
            line1: "test",
            line2: "test",
            city: "Pune",
            country: "India",
            postal_code: "411023",
            state: "Maharashtra",
          };
        console.log(req.body)
        // const charge = await stripe.charges.create({
        //     amount:500,
        //     currency:'INR',
        //     description:'$5 for 5 credits',
        //     source:req.body.id,
        //     // name:"test",
        //     // address:stripeAddress 
            
        // })

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'usd',
           
            automatic_payment_methods: {
              enabled: true,
            },
          });

        console.log(paymentIntent)
        req.user.credits+= 5;
        const user = await req.user.save()
        res.send(user)
    })
}