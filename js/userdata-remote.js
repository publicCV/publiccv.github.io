function loadUserData() {
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 31556925994)
    var options={"separator" : ";"};
    var data;
    var url = window.location.href
    var csv = url ? url.split('?')[1].split('+')[0] : window.location.search.slice(1);
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
    //console.log(csv)
    
    //Userinfo
    $.ajax({
        type: "GET",  
        url: csv+"/about.csv",
        dataType: "text",       
        success: function(response)  
        {
        data = $.csv.toArrays(response,options);
        //console.log(data);
        $('#employeename').text(data[1][0]); 
        $('#shortdesc').text(data[1][1]);
        $('#employeeabout').html(data[1][2]);
        $('#age').text(getAge(data[1][3]));
        $('#employeeemail').text(data[1][4]);
        $('#employephone').text(data[1][5]);
        $('#employeesmalladdress').text(data[1][6]);
        $('#employeelanguages').text(data[1][7]);
        $('#employeephoto').attr("src", data[1][8]);
        }   
    });

    //Skills
    $.ajax({
        type: "GET",  
        url: csv+"/skills.csv",
        dataType: "text",       
        success: function(response)  
        {
        skillsdata = $.csv.toArrays(response,options);
        //console.log(skillsdata);
        const length = skillsdata.length;
        var newdiv = "";
        for (let i = 1; i < length; i++) {
            //console.log(skillsdata[i][0])
            var html = `
            <div class="row">
                <div class="col-md-6">
                    <div class="progress-container progress-primary">
                <span class="progress-badge">
                    <a href="${skillsdata[i][0]}">${skillsdata[i][1]}</a>
                </span>
                    <div class="progress">
                        <div class="progress-bar progress-bar-primary aos-init aos-animate" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div>
                            <span class="progress-value"${skillsdata[i][2]}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="progress-container progress-primary">
                <span class="progress-badge">
                    <a href="${skillsdata[i][3]}">${skillsdata[i][4]}</a>
                </span>
                    <div class="progress">
                        <div class="progress-bar progress-bar-primary aos-init aos-animate" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 85%;"></div>
                            <span class="progress-value"${skillsdata[i][5]}</span>
                        </div>
                    </div>
                </div>
                </div>
            `;
        newdiv += html
        //console.log(newdiv)
        }
        $("#skills").html(newdiv)
    }});

    //Experience
    $.ajax({
        type: "GET",  
        url: csv+"/experience.csv",
        dataType: "text",       
        success: function(response)  
        {
            xperiencedata = $.csv.toArrays(response,options);
            //console.log(skillsdata);
            const length = xperiencedata.length;
            var newdiv = '<div class="h4 text-center mb-4 title">Work Experience</div>';
            for (let i = 1; i < length; i++) {
                html = `
                <div class="card">
                <div class="row">
                    <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                    <div class="card-body cc-experience-header">
                        <p>${xperiencedata[i][0]}</p>
                        <div class="h5">
                            <a href="${xperiencedata[i][1]}">
                            <img src="${xperiencedata[i][2]}" height="30%" width="30%"></a></div>
                    </div>
                    </div>
                    <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                    <div class="card-body">
                        <div class="h5">${xperiencedata[i][3]}</div>
                        <p>
                        ${xperiencedata[i][4]}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            `;
                newdiv += html
            }
            $("#xperience").html(newdiv)
        }
    });

    //Education
    $.ajax({
        type: "GET",  
        url: csv+"/education.csv",
        dataType: "text",       
        success: function(response)  
        {
            educationdata = $.csv.toArrays(response,options);
            //console.log(skillsdata);
            const length = educationdata.length;
            var newdiv = '<div class="h4 text-center mb-4 title">Education</div>';
            for (let i = 1; i < length; i++) {
                html = `<div class="card">
                <div class="row">
                  <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                    <div class="card-body cc-education-header">
                      <p>${educationdata[i][0]}</p>
                      <div class="h5">
                        <a href="${educationdata[i][1]}">
                        <img src="${educationdata[i][2]}" height="30%" width="30%"></a></div>
                    </div>
                  </div>
                  <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                    <div class="card-body">
                      <div class="h5">
                        <a href="${educationdata[i][3]}">${educationdata[i][4]}</a></div>
                      <p class="category">
                        <a href="${educationdata[i][5]}">${educationdata[i][6]}</a></p>
                      <p>
                      ${educationdata[i][7]}
                      </p>
                    </div>
                  </div>
                </div>
            </div>
            `;
                newdiv += html
            }
            $("#edu").html(newdiv)
        }
    });

    //Projects
    $.ajax({
        type: "GET",  
        url: csv+"/projects.csv",
        dataType: "text",       
        success: function(response)  
        {
            var newdiv = '';
            projectsdata = $.csv.toObjects(response,options);
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
        $("#employeeprojects").html(newdiv.replace(/\r?\n|\r/g, " ") );
        }
        }
    );

    //References
    $.ajax({
        type: "GET",  
        url: csv+"/references.csv",
        dataType: "text",       
        success: function(response)  
        {
            var newdiv = '';
            referencedata = $.csv.toObjects(response,options);
            refjson = (JSON.parse(JSON.stringify(referencedata)))
            $.each(refjson, function (key, value) {
                if ( key === 0) {
                    html = `<div class="carousel-item active">`
                }else{
                    html = `<div class="carousel-item">`
                }
                html += `   <div class="row">
                                <div class="col-lg-2 col-md-3 cc-reference-header">
                                    <img src=${value.Photo} alt="Image"/>
                                    <div class="h5 pt-2" style="font-size: 12px">${value.Name}</div>
                                    <p class="category" style="font-size: 11px">${value.Position}</p>
                                </div>
                                <div class="col-lg-10 col-md-9">
                                    <p>
                                    ${value.Reference}
                                    </p>
                                </div>
                            </div>
                        </div>`
                newdiv += html
                }
            )
        $("#employeereferences").html(newdiv.replace(/\r?\n|\r/g, " ") );
        }
    })

    
}

document.addEventListener("load", function() {
    var url = window.location.href
    var test = url.split('?')[1]
    if (test){ var mcolor = url ? url.split('?')[1].split('+')[1] : window.location.search.slice(1); }else{var mcolor = "green" }
    if (mcolor){ var cscolor = mcolor }else{ var cscolor = "green"}
    document.getElementById("buttonhire").style.backgroundColor = 'blue' ;
    document.getElementById("buttoncv").style.backgroundColor = 'blue' ;
    $('.btn-primary').hover( function() {$( this ).css({"background":cscolor})},function() {$( this ).css({"background":"blue"})} )
    $('#employeeabout p a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.progress-badge a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.h5 a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.category a').hover( function() {$( this ).css({"color":cscolor})},function() {$( this ).css({"color":"blue"})} )
    $('.page-header').css({"background":"linear-gradient(0deg, rgba(44, 44, 44, 0.2), "+ cscolor +")"})
    $('.progress').css({"background":"light"+ cscolor})
    $('.progress-bar').css({"background":cscolor})
    $('.progress-value').css({"color":cscolor})
    $(".col-md-3.bg-primary").attr('style', 'background-color: '+ cscolor +' !important');
});

document.onload = loadUserData();
window.onload = loadUserData();
loadUserData();
