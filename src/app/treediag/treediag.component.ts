import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import { ont, ont_highchair } from '../fd-ontology/ontology';
import { recursionParse, ontNode } from './model/recursion';
export class leaf {
  name: string;
  url: string;
  color: string;
  children: leaf[] = [];
}

@Component({
  selector: 'app-treediag',
  templateUrl: './treediag.component.html',
  styleUrls: ['./treediag.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TreediagComponent implements OnInit {
  prop = {name: 'test'};
  constructor() {
  }

  ngOnInit() {

    const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 90) + ")");

    const tree = d3.tree()
    .size([2 * Math.PI, 400])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });

    const root = tree(d3.hierarchy(this.parse_node(ont_highchair.completeStructure)));
    // root.children.forEach(collapse);
    // update(root);
    const link = g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));

    const node = g.selectAll(".node")
          .data(root.descendants())
          .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; })
            .on("click", click)
            .on("dblclick", dblclick);

            node.append("circle")
              .attr("r", 5)
              .style("fill", (d) => {
                if (d.data.color === 'green') {
                  return '#0f0';
                } else {
                  if (d.depth === 0) {
                    return '#999';
                  }
                  return '#f00';
                }
              });

          node.append("text")
              .attr("dy", "0.31em")
              .attr("x", function(d) { return d.x < Math.PI === !d.children ? 6 : -6; })
              .attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
              .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
              .text(function(d) { return d.data.name; });


    function radialPoint(x, y) {
          return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
    }


    function click(d) {
        d3.select(this).select("circle").transition()
            .duration(1000)
            .attr("r", 6);
    }

    function dblclick(d) {
      console.log(d.parent);
      d3.select(this).select("circle").transition()
        .duration(1000)
        .attr("r", 16);
    }
}

  parse_node(jsonVal: any): any {
    let node = new leaf();
    node.name = jsonVal.concept.translatedURL;
    node.url = jsonVal.concept.url;


    // adding dataproperties
    for (let datProp of jsonVal['dataproperties']) {
      node.children.push({name: datProp['translatedURL'], url: datProp['url'],
      color: 'green', children: []});
  }

  // adding objectproperties

  for (let objKey in jsonVal['objectproperties']) {
    if (jsonVal['objectproperties'].hasOwnProperty(objKey)) {
      // recursion..
      node.children.push(
        this.parse_node(jsonVal['objectproperties'][objKey])
      );
    }
  }
  return {name: node.name, url: node.url, color: node.color, children: node.children};
  }
}
