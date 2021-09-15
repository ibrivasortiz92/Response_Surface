
document.getElementById("calculate").addEventListener("click",()=>{
  let a0 = parseFloat(document.getElementById("a0").value);
  let a1 = parseFloat(document.getElementById("a1").value);
  let a2 = parseFloat(document.getElementById("a2").value);
  let a3 = parseFloat(document.getElementById("a3").value);
  let a4 = parseFloat(document.getElementById("a4").value);
  let a5 = parseFloat(document.getElementById("a5").value);
  let xmin = parseFloat(document.getElementById("xmin").value);
  let xmax = parseFloat(document.getElementById("xmax").value);
  let ymin = parseFloat(document.getElementById("ymin").value);
  let ymax = parseFloat(document.getElementById("ymax").value);
  let xtitle = document.getElementById("xtitle").value;
  let ytitle = document.getElementById("ytitle").value;
  let ztitle = document.getElementById("ztitle").value;

  let monitor = document.getElementById("chart");
  monitor.innerHTML = "";
  let plot = document.createElement("div");
  plot.id = "myplot";
  plot.style.width = "100%";
  plot.style.height = "100%";
  monitor.append(plot);

  let xdata = x_layout(xmin, xmax);
  let ydata = y_layout(ymin, ymax);
  let zdata = z_data(a0, a1, a2, a3, a4, a5, xdata, ydata);
  let plot_color = "RdBu", rev = false;
  if(document.getElementById("gray_color").checked){
    plot_color = "Greys";
    rev = true;
  }

  if(document.getElementById("proy_map").checked){
    
    Plotly.newPlot("myplot", [
      // DATA
      {
      x: xdata,
      y: ydata,
      z: zdata,
      type: "contour",
      colorscale: plot_color,
      reversescale: rev,
      contours: {
        coloring: 'heatmap',
        showlabels: true,
        labelfont: {
          family: 'Raleway',
          size: 12,
          color: 'white',
        }
      },
      cmin: 0,
      colorbar: {
        title: ztitle,
        titleside: "right",
        thickness: 10,
        len: 0.8
      }
    }], 

    // LAYOUT
    {
      margin: {
        t: 50,
        b: 50
      },
      xaxis: {title: xtitle},
      yaxis: {title: ytitle},
      width: 700,
      height: 500
    }, 
    // CONFIG
    {
      responsive: true,
      displaylogo: false,
      toImageButtonOptions: {
        format: 'png',
        filename: 'response_surface',
        height: 500,
        width: 700,
        scale: 1
      }
    });

  }
  else {

    Plotly.newPlot("myplot", [

      // DATA
      {
      x: xdata,
      y: ydata,
      z: zdata,
      type: "surface",
      colorscale: plot_color,
      reversescale: rev,
      contours: {
        z: {
          show: true,
          usecolormap: true,
          highlightcolor: "#42f462",
          highlightwidth: 20,
          width: 20,
          start: 5,
          end: 10,
          project: {z: true},
        },
        coloring: 'heatmap',
      showlabels: true,
      labelfont: {
        family: 'Raleway',
        size: 12,
        color: 'white',
      }
      },
      cmin: 0,
      colorbar: {
        title: ztitle,
        titleside: "right",
        thickness: 10,
        len: 0.8
      }
    }], 

    // LAYOUT
    {
      margin: {
        t: 0,
        b: 0
      },
      scene: {
        xaxis: {
          title: xtitle, 
          showgrid: true, 
          showline: true, 
          mirror: true,
          zeroline: false,
          gridcolor: "rgb(240,240,240)"
        },
        yaxis: {
          title: ytitle, 
          showgrid: true, 
          showline: true, 
          mirror: true,
          zeroline: false,
          gridcolor: "rgb(240,240,240)"
        },
        zaxis: {
          title: ztitle,
          rangemode: 'tozero',
          autorange: true,
          showgrid: true, 
          showline: true, mirror: true, 
          showspikes: true,
          zeroline: false,
          gridcolor: "rgb(240,240,240)"
        },
        camera: {
          type: "orthographic",
          eye: {
            x: 1.75, y: 1.75, z: 1.75
          }
        }
      },
      width: 700,
      height: 500
    }, 

    // CONFIG
    {
      responsive: true,
      displaylogo: false,
      toImageButtonOptions: {
        format: 'png',
        filename: 'response_surface',
        height: 500,
        width: 700,
        scale: 1
      }
    });

  }

  
});


function x_layout(xmin, xmax){
  let xdata = [xmin];
  let x = xmin, h = (xmax - xmin) / 100;
  for (let i = 0; i < 100; i++){
    x = x + h;
    xdata.push(x);
  }
  return xdata;
}


function y_layout(ymin, ymax){
  let ydata = [ymin];
  let y = ymin, h = (ymax - ymin) / 100;
  for (let j = 0; j < 100; j++){
    y = y + h;
    ydata.push(y);
  }
  return ydata;
}


function z_data(a0, a1, a2, a3, a4, a5, xdata, ydata){
  let zdata = [];
  let z;
  for (let j = 0; j < 100; j++){
    let aux = [];
    for (let i = 0; i < 100; i++){
      z = a0 + a1 * xdata[i] + a2 * ydata[j] + a3 * xdata[i] * ydata[j] + a4 * xdata[i] * xdata[i] + a5 * ydata[j] * ydata[j];
      aux.push(z);
    }
    zdata.push(aux);
  }
  return zdata;
}


function default_monitor(){
  let monitor = document.querySelector(".monitor");
  monitor.innerHTML = "<img style=' width: 80%; height: 80%; object-fit: contain;' src='monitor.png'>";
}
default_monitor();




