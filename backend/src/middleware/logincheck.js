
module.exports = async(ctx,next)=>{
    const session = ctx.session
    if (session && session.userInfo){
        await next()
        return
    }
    ctx.body={
        errno:-1,
        message:'Please Log In first!'
    }
}