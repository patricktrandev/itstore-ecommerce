
const handleDulplicate = (err) => {
    return (req, res, next) => {
        if (err.code === 11000) {
            return next(
                res.status(400).json({
                    isSuccess: false,
                    error: `Duplicate ${Object.keys(err.key.value)} entered`
                }))

        }
        next()
    }
}

module.exports = {
    handleDulplicate
}