import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-fdlayout',
  templateUrl: './fdlayout.component.html',
  styleUrls: ['./fdlayout.component.css']
})
export class FdlayoutComponent implements OnInit {
  svg;
  width;
  height;
  color;
  simulation;
  link;
  node;
  data;
  text;


  constructor() {
  this.data = {
    'nodes': [
      {"name": "Sylvester", "sex": "M"},
          {"name": "Lillian", "sex": "F"},
          {"name": "Gordon", "sex": "M"},
          {"name": "Mary", "sex": "F"},
          {"name": "Helen", "sex": "F"},
          {"name": "Jamie", "sex": "M"},
          {"name": "Jessie", "sex": "F"},
          {"name": "Ashton", "sex": "M"},
          {"name": "Duncan", "sex": "M"},
          {"name": "Evette", "sex": "F"},
          {"name": "Mauer", "sex": "M"},
          {"name": "Fray", "sex": "F"},
          {"name": "Duke", "sex": "M"},
          {"name": "Baron", "sex": "M"},
          {"name": "Infante", "sex": "M"},
          {"name": "Percy", "sex": "M"},
          {"name": "Cynthia", "sex": "F"}
    ],
    'links': [
      {"source": "Sylvester", "target": "Gordon", "type":"A" },
  {"source": "Sylvester", "target": "Lillian", "type":"A" },
  {"source": "Sylvester", "target": "Mary", "type":"A"},
  {"source": "Sylvester", "target": "Jamie", "type":"A"},
  {"source": "Sylvester", "target": "Jessie", "type":"A"},
  {"source": "Sylvester", "target": "Helen", "type":"A"},
  {"source": "Helen", "target": "Gordon", "type":"A"},
  {"source": "Mary", "target": "Lillian", "type":"A"},
  {"source": "Ashton", "target": "Mary", "type":"A"},
  {"source": "Duncan", "target": "Jamie", "type":"A"},
  {"source": "Gordon", "target": "Jessie", "type":"A"},
  {"source": "Sylvester", "target": "Fray", "type":"E"},
  {"source": "Fray", "target": "Mauer", "type":"A"},
  {"source": "Fray", "target": "Cynthia", "type":"A"},
  {"source": "Fray", "target": "Percy", "type":"A"},
  {"source": "Percy", "target": "Cynthia", "type":"A"},
  {"source": "Infante", "target": "Duke", "type":"A"},
  {"source": "Duke", "target": "Gordon", "type":"A"},
  {"source": "Duke", "target": "Sylvester", "type":"A"},
  {"source": "Baron", "target": "Duke", "type":"A"},
  {"source": "Baron", "target": "Sylvester", "type":"E"},
  {"source": "Evette", "target": "Sylvester", "type":"E"},
  {"source": "Cynthia", "target": "Sylvester", "type":"E"},
  {"source": "Cynthia", "target": "Jamie", "type":"E"},
  {"source": "Mauer", "target": "Jessie", "type":"E"}
    ]
  } }

  ngOnInit() {
    this.loadGraph();
  }

  loadGraph(): void {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.color = d3.scaleOrdinal(d3.schemeCategory20);

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d['name']).strength(-1))
      .force('charge', d3.forceManyBody().strength(-30).distance_max(1))
      .force('center', d3.forceCenter(this.width / 2 , this.height / 2));
    this.render(this.data);
  }

  render(graph: any): void {
    graph.nodes[0].fixed = true;
    graph.nodes[0].fx = this.width - 20;
    graph.nodes[0].fy = this.height - 100;
    this.link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph['links'])
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .style("stroke", (d) => { return (d.type === 'E') ? 'red' : 'green'});;

    this.node = this.svg.append('g')
          .attr('class', 'nodes')
          .selectAll('circle')
          .data(graph['nodes'])
          .enter()
          .append('circle')
          .attr('r', 10)
          .attr('fill', (d) => this.color(this.nodeColor(d)))
          .call(d3.drag()
            .on('start', (d) => {return this.dragStarted(d);})
            .on('drag', (d) => {return this.dragged(d);})
            .on('end', (d) => {return this.dragEnded(d);})
          )
          .on('click', (d) => this.alert(d));

      this.text = this.svg.append('g')
            .attr('class', 'node')
            .selectAll('text')
            .data(graph.nodes)
            .enter()
            .append('text')
            .attr('x', 12)
            .attr('y', '.25em')
            .text((d) => { return d.name;})

      this.simulation
      .nodes(graph.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(graph['links']);
  }

  nodeColor(d): number {
     return (d.sex === 'M') ? 3 : 4;
  }
  dragStarted(d): void {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d): void {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  dragEnded(d): void {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }


  ticked(): void {
  // this.node
  // .attr("cx", function(d) { return d.x; })
  // .attr("cy", function(d) { return d.y; });
  this.node.attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; });
  this.text.attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; });

  //update link positions
  //simply tells one end of the line to follow one node around
  //and the other end of the line to follow the other node around
  this.link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  }

  alert(d) {
    console.log(d.name)
  }

}
