// number format
const nf = new Intl.NumberFormat('en-US')
// price format
function pf(sum, currency) {
    const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: `${currency}` })
    return priceFormatter.format(`${sum}`)
};

module.exports = { nf, pf }
