document.addEventListener("DOMContentLoaded", function () {
  const shapeSelect = document.getElementById("shapeSelect");
  const rectangleInputs = document.getElementById("rectangleInputs");
  const circleInputs = document.getElementById("circleInputs");
  const cylinderInputs = document.getElementById("cylinderInputs");
  const shapeForm = document.getElementById("shapeForm");
  const results = document.getElementById("results");
  const shapeName = document.getElementById("shapeName");
  const shapeArea = document.getElementById("shapeArea");
  const shapePerimeter = document.getElementById("shapePerimeter");
  const shapeDrawing = document.getElementById("shapeDrawing");

  shapeSelect.addEventListener("change", function () {
    toggleInputs(shapeSelect.value);
  });

  shapeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    calculateShape();
  });

  function toggleInputs(shapeType) {
    rectangleInputs.style.display = "none";
    circleInputs.style.display = "none";
    cylinderInputs.style.display = "none";

    if (shapeType === "Rectangle") {
      rectangleInputs.style.display = "block";
    } else if (shapeType === "Circle") {
      circleInputs.style.display = "block";
    } else if (shapeType === "Cylinder") {
      cylinderInputs.style.display = "block";
    }
  }

  function calculateShape() {
    const selectedShape = shapeSelect.value;
    let shape;
    let area;
    let perimeter;

    if (selectedShape === "Rectangle") {
      const width = parseFloat(document.getElementById("rectangleWidth").value);
      const height = parseFloat(
        document.getElementById("rectangleHeight").value
      );
      shape = new Polygon("Rectangle", width, height);
    } else if (selectedShape === "Circle") {
      const radius = parseFloat(document.getElementById("circleRadius").value);
      shape = new Circle(radius);
    } else if (selectedShape === "Cylinder") {
      const radius = parseFloat(
        document.getElementById("cylinderRadius").value
      );
      const height = parseFloat(
        document.getElementById("cylinderHeight").value
      );
      shape = new Cylinder(radius, height);
    }

    area = shape.calculateArea();
    perimeter = shape.calculatePerimeter();

    shapeName.textContent = shape.getShapeName();
    shapeArea.textContent = area;
    shapePerimeter.textContent = perimeter;

    // تنظیم استایل شکل
    shapeDrawing.className = "shape " + selectedShape.toLowerCase();
    results.style.display = "block";
  }
});

class Shape {
  constructor(shapeName) {
    this._shapeName = shapeName;
  }

  getShapeName() {
    return this._shapeName;
  }

  calculateArea() {
    throw new Error("Abstract method calculateArea() must be implemented.");
  }

  calculatePerimeter() {
    throw new Error(
      "Abstract method calculatePerimeter() must be implemented."
    );
  }
}

class Polygon extends Shape {
  constructor(shapeName, width, height) {
    super(shapeName);
    this._width = width;
    this._height = height;
  }

  calculateArea() {
    return this._width * this._height;
  }

  calculatePerimeter() {
    return 2 * (this._width + this._height);
  }
}

class NonPolygon extends Shape {
  constructor(shapeName, radius) {
    super(shapeName);
    this._radius = radius;
  }

  calculateArea() {
    throw new Error("Abstract method calculateArea() must be implemented.");
  }

  calculatePerimeter() {
    throw new Error(
      "Abstract method calculatePerimeter() must be implemented."
    );
  }
}

class Circle extends NonPolygon {
  constructor(radius) {
    super("Circle", radius);
  }

  calculateArea() {
    return Math.PI * Math.pow(this._radius, 2);
  }

  calculatePerimeter() {
    return 2 * Math.PI * this._radius;
  }
}

class Cylinder extends Circle {
  constructor(radius, height) {
    super(radius);
    this._height = height;
  }

  calculateArea() {
    const baseArea = super.calculateArea();
    const lateralSurfaceArea = 2 * Math.PI * this._radius * this._height;
    return 2 * baseArea + lateralSurfaceArea;
  }

  calculateVolume() {
    return super.calculateArea() * this._height;
  }
}
