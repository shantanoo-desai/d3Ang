export class ontNode {
  public id: number;
  public attr: any[] = [];
  public children: ontNode[] = [];
}

export class recursionParse {

  private nodes: any[] = [];
  private links: any[] = [];


  public parse_ontology(ont: any): any {

    let linkedOntTree = this.parse_node(ont.viewStructure);
    this.links = this.parse_link(linkedOntTree);
    // console.log({'nodes': this.nodes, 'links': this.links});

    return {'nodes': this.nodes, 'links': this.links}

  }


  private parse_node(jsonVal: any): any {
    let node = new ontNode();
    node.id = this.nodes.length;
    this.nodes.push({
      name: jsonVal.concept.translatedURL,
      url: jsonVal.concept.url,
      id: this.nodes.length,
      color: 'red'
    });


    // adding dataproperties
    for (let datProp of jsonVal.dataproperties) {
      this.nodes.push({
        name: datProp.translatedURL,
        url: datProp.url,
        id: this.nodes.length,
        color: 'green'
      });
      node.attr.push(this.nodes.length);
  }

  // adding objectproperties

  for (let objKey in jsonVal.objectproperties) {
    if (jsonVal.objectproperties.hasOwnProperty(objKey)) {
      // recursion..
      node.children.push(
        this.parse_node(jsonVal['objectproperties'][objKey])
      );
    }
  }
  return node;
  }

  private parse_link(linkedOntTree: any): any {
    let links: any[] = [];

    for (let attr of linkedOntTree.attr) {
      links.push({
        source: linkedOntTree.id,
        target: attr
      });
    }

    for (let child of linkedOntTree.children) {
      links.push({
        source: linkedOntTree.id,
        target: child.id
      });

      let childJSON = this.parse_link(child);

      childJSON.forEach(element => links.push(element));
    }

    return links;
  }


}
