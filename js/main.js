let i = 0;
let dias = new Array();
let confirmados = new Array();
let recuperados = new Array();
let muertos = new Array();


document.querySelector("#btnInfo").addEventListener('click', cargaDatos);
document.querySelector("#btnBorrar").addEventListener('click', borrarDatos);




function cargaDatos(){
    const pais =  document.querySelector("#pais").value;
    if(pais ===''){
        alert("Ingresar un pais nuevamente");

    }else{

        fetch('https://pomber.github.io/covid19/timeseries.json')
        .then(res => res.json())
        .then(data => {

            data[pais].forEach(( {date, confirmed, recovered, deaths} ) => {
                dias[i] = date;
                confirmados[i] = confirmed;
                recuperados[i] = recovered;
                muertos[i] = deaths;
                i++;
            });
            i=0;

        })
        .catch(function(error){
            alert("Ingresar un pais correctamente");
            console.log(error);
        })

        muestroGrafico();
    } 

}

function borrarDatos(){
location.reload();

}

function muestroGrafico(){

    const ctx1 = document.querySelector("#myChart").getContext("2d");


    const resultados = document.querySelector("#resultados");
    resultados.style.display = "block";


    let myChart = new Chart(ctx1,{
        type: 'line',
        data: {
            labels: dias,
            datasets:[{
                    label:'Confirmados',
                    data: confirmados,
                    borderColor: "rgb(46,129,38)",
                    backgroundColor: 'rgba(46, 129, 38, 0.2)',
            }, {
                    label:'Recuperados',
                    data: recuperados,
                    borderColor: "rgb(205,195,16)",
                    backgroundColor: 'rgba(205, 195, 16, 0.2)'
                },{

                    label:'Muertos',
                    data: muertos,
                    borderColor: "rgb(215,73,18)",
                    backgroundColor: 'rgba(215, 73, 18, 0.2)'
                }]

        }

    });


}