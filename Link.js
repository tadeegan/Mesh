var LINK_STRENGTH = 10;
var Link = function(node1, node2, length){
	var _length;
	var _nodes;
	this.getNodes = function(){
		return _nodes;
	}
	this.getOppNode = function(node){
		return _nodes[(_nodes[0] == node) ? 1 : 0]
	}
	this.getLength = function(){
		return _length;
	}
	this.setLength = function(length){
		var MIN = 40;
		if (length < 40){
			_length = 40;
		}
		else{
			_length = length;
		}
		return this;
	}
	if(node1 == node2) throw new Error("You cannot attach a node to its self!");
	_nodes = [node1,node2];
	node1.attachNode(this);
	node2.attachNode(this);
	this.setLength(length || getRandomInt(40,80));
	Link.allLinks.push(this);
}
Link.prototype.display = function(context) {
	var nodes = this.getNodes();
	context.beginPath();
	context.strokeStyle = '#000000';
	context.lineWidth = 3;

	context.moveTo(nodes[0].getPos().x,nodes[0].getPos().y);
	context.lineTo(nodes[1].getPos().x,nodes[1].getPos().y);
	context.stroke();
};
Link.prototype.getForce = function(){
	var nodes = this.getNodes();
	var nodeDistance = new Vector2(nodes[0].getPos().x - nodes[1].getPos().x, nodes[0].getPos().y - nodes[1].getPos().y).length();
	var diff = (this.getLength() - nodeDistance)/this.getLength()*LINK_STRENGTH;
	return -diff;
}
Link.allLinks = [];
Link.getAll = function(){
	return Link.allLinks;
}
