module.exports = async (status,message,status_code,data,res) =>{
    return await res.status(status_code).json({
        status,
        message,
        data
    })

}