function groupBy(arr, prop) {
    const map = new Map(Array.from(arr, obj => [obj[prop], []]));
    arr.forEach(obj => map.get(obj[prop]).push(obj));
    return Array.from(map.values());
}

function group(data, index) {
    var o;
    var other = {};
    $.each(data, function(i, value) {
        o = data[i][index];         
        if (!(o in other))
            other[o] = [];
        other[o].push(data[i]);
    })
    return other;           
}


function objectLength(obj){
    var counter = 0;
    for(var i in obj)
    {
        counter +=1;
    }
    return counter
}

var options={"separator" : ";"};
var data;
var url = window.location.href
var csv = url ? url.split('?')[1] : window.location.search.slice(1);
var projectsdata
var jsonobject
var groupedjson

const groupsBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );

  const groupByBA = groupsBy('BusinessArea');
  
//var mcsv = $.ajax("http://localhost/csv/mtv/projects.csv")

    var newdiv = '';

    //Education
    $.ajax({
        type: "GET",  
        url: "csv/"+csv+"/projects.csv",
        dataType: "text",       
        success: function(response)  
        {
            //projectsdata = response
            //console.log(response)
            //projectsdata = $.csv.toArrays(response,options);
            projectsdata = $.csv.toObjects(response,options);
            //jsonobject = JSON.stringify(projectsdata);
            groupedjson = JSON.parse(JSON.stringify({ projectsByBA: groupByBA(projectsdata) }, null, 2)).projectsByBA
            $.each(groupedjson, function (key, value) {
                if ( key === "HealthCare") {
                    html = `<div class="carousel-item active">`
                }else{
                    html = `<div class="carousel-item">`
                }
                html += `   <div class="row">
                                <div class="col-lg-2 col-md-3 cc-reference-header">
                                    <div class="h5 pt-2" style="font-size: 18px"></div>
                                    <p class="category" style="font-size: 14px">${key}</p>
                                </div>
                                <div class="col-lg-10 col-md-9">
                                    <p>`
                tmphtml = '';
                $.each(value, function (mkey, mvalue) {
                    tmphtml += `<b>${mvalue.Company}</b> : ${mvalue.ShortDesc}<br>`
                })
                    html += tmphtml
                    html += `       </p>
                                </div>
                            </div>
                        </div>`
                newdiv += html
                }
            )

        }
        }
    );

$("#employeeprojects").html(newdiv.replace(/\r?\n|\r/g, " ") );



