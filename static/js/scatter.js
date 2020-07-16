/**
 * @class Scatter
 * Referenced: https://www.d3-graph-gallery.com/graph/scatter_basic.html
 */
class Scatter {

    // Elements
    svg = null;
    g = null;
    xAxisG = null;
    yAxisG = null;

    // Configs
    svgW = 360;
    svgH = 360;
    gMargin = { top: 50, right: 25, bottom: 75, left: 75 };
    gW = this.svgW - (this.gMargin.right + this.gMargin.left);
    gH = this.svgH - (this.gMargin.top + this.gMargin.bottom);

    // axies
    scX = null
    scY = null
    yAxis = null
    xAxis = null

    /*
    Constructor
     */
    constructor(_data, _target) {
        // Assign parameters as object fields
        this.data = _data;
        this.target = _target;

        // Tools
        this.scX = d3.scaleLinear()
            .domain([0, Math.max(...this.data.map(data => data.experience_yr))])
            .range([0, this.gW]);
        this.scY = d3.scaleLinear()
            .domain([0, Math.max(...this.data.map(data => data.hw1_hrs))])
            .range([this.gH, 0]);
        this.yAxis = d3.axisLeft(this.scY).ticks(10);
        this.xAxis = d3.axisBottom(this.scX);
        // Now init
        this.init();
    }

    /** @function init()
     * Perform one-time setup function
     *
     * @returns void
     */
    init() {
        // Define this vis
        const vis = this;

        // Set up the svg/g work space
        vis.svg = d3.select(`#${vis.target}`)
            .append('svg')
            .attr('width', vis.svgW)
            .attr('height', vis.svgH);

        vis.g = vis.svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${vis.gMargin.left}px, ${vis.gMargin.top}px)`);

        vis.xAxisG = vis.g.append("g")
            .attr('class', 'axis axisX')
            .style('transform', `translateY(${vis.gH + 15}px)`);
        vis.xAxisG.append('text')
            .attr('class', 'label labelX')
            .style('transform', `translate(${vis.gW / 2}px, 40px)`)
            .text('Years of Experience');

        vis.yAxisG = vis.g.append("g")
            .attr('class', 'axis axisY')
            .style('transform', 'translateX(-15px)');
        vis.yAxisG.append('text')
            .attr('class', 'label labelY')
            .style('transform', `rotate(-90deg) translate(-${vis.gH / 2}px, -30px)`)
            .text('Hours spent on HW1');

        // Now wrangle
        vis.wrangle();
    }

    /** @function wrangle()
     * Preps data for vis
     *
     * @returns void
     */
    wrangle() {
        // Define this vis
        const vis = this;

        // Now render
        vis.render();
    }

    /** @function render()
     * Builds, updates, removes elements in vis
     *
     * @returns void
     */
    render() {
        // Define this vis
        const vis = this;

        // Add dots
        vis.g.selectAll("dot")
            .data(vis.data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return vis.scX(d.experience_yr); })
            .attr("cy", function (d) { return vis.scY(d.hw1_hrs); })
            .attr("r", 1.5)
            .style("fill", "#69b3a2");

        vis.yAxisG.call(this.yAxis);
        vis.xAxisG.call(this.xAxis);
    }
}