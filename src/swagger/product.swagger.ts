const ProductApiDoc = {
    "/product": {
        get: {
            summary: "Fetch all the products",
            parameters: [
                {
                    in: "query",
                    name: "page",
                    default: 1,
                    schema: { type: "number" }
                },
                {
                    in: "query",
                    name: "limit",
                    default: 12,
                    schema: { type: "number" }
                }
            ],
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema : {
                                type: "array ",
                                items: {
                                    type: "object",
                                    properties: {
                                        _id: { type: "string" },
                                        title: { type: "string" },
                                        price: { type: "number" },
                                        discount: { type: "number" }
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error"
                }
            }
        },
        post: {
            summary: "Add a new product",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                price: { type: "number" },
                                discount: { type: "number" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    _id: { type: "string" },
                                    title: { type: "string" },
                                    price: { type: "number" },
                                    discount: { type: "number" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Internal server error" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/product/{id}": {
        put: {
            summary: "Update a product by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                price: { type: "number" },
                                discount: { type: "number" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                    content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                _id: { type: "string" },
                                title: { type: "string" },
                                price: { type: "number" },
                                discount: { type: "number" }
                            }
                        }
                    }
                }
                },
                404: {
                    description: "Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Product not found with id" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Internal server error" }
                                }
                            }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Delete a product by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    price: { type: "number" },
                                    discount: { type: "number" }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Product not found with id" }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Internal server error" }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default ProductApiDoc