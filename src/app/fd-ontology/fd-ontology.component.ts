import { Component, OnInit, AfterViewInit } from '@angular/core';
import { recursionParse } from './model/recursion';
import { ont, ont_highchair } from './ontology';
import * as d3 from 'd3';

@Component({
  selector: 'app-fd-ontology',
  templateUrl: './fd-ontology.component.html',
  styleUrls: ['./fd-ontology.component.css']
})
export class FdOntologyComponent implements OnInit, AfterViewInit {
  ontology: object = {};
  svg;
  width;
  height;
  color;
  simulation;
  link;
  node;
  data;
  text;

  constructor() { }
  ngOnInit() {
    let parsed_ontology: any = new recursionParse();
    this.ontology = parsed_ontology.parse_ontology(ont_highchair);

    console.log(this.ontology);

    this.loadGraph();
  }

  loadGraph(): void {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d['id']).strength(0))
      .force('x', d3.forceX().strength(0))
      .force('y', d3.forceY().strength(0))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2 , this.height / 2));
    this.render(this.ontology);
  }

  render(graph: any): void {

    graph.nodes[0].fixed = true;
    // graph.nodes[0].fx = this.width - 20;
    // graph.nodes[0].fy = this.height - 100;
    graph.nodes[0].color = 'blue';

    this.link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph['links'])
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .style("stroke", 'black');

    this.node = this.svg.append('g')
          .attr('class', 'nodes')
          .selectAll('circle')
          .data(graph['nodes'])
          .enter()
          .append('circle')
          .attr('r', 10)
          .attr('fill', (d) => {return (d.color)})
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
          .text((d) => { return d.name;});

    this.simulation
    .nodes(graph.nodes)
    .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
    .links(graph['links']);

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
    d.fx = d.x;
    d.fy = d.y;
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
    console.log(d.name, d.url);
  }

  ngAfterViewInit() {  }

}
