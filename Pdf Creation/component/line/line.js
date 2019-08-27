module.exports= function ()  {
   return{
    layout: 'headerLineOnly', // optional
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: [ '*', 'auto', 0, '*' ],

      body: [
        [ '', '', '', '' ],
        [ '', '', '', '' ]
      ]
    }
  }
}