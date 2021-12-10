import { Controller, Post, Put, Delete, Res, HttpStatus, Body, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProducDto: CreateProductDto){
        //console.log(createProducDto);
        const product = await this.productService.createProduct(createProducDto)
        return res.status( HttpStatus.OK).json({
            message:"Product succesfully created",
            product
        })
    }

    @Get('/')
    async getProductS(@Res() res){
        const products = await this.productService.getProducts()
        return res.status( HttpStatus.OK).json(
            {
                message:" List generated ok",
                products
            }
        )
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID ){
        const product = await this.productService.getProduct(productID)

        if (!product) throw new NotFoundException('Product Does not exist');

        return res.status( HttpStatus.OK).json(
            {
                message:" List generated ok",
                product
            }
        )
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
        const product = await this.productService.deleteProduct(productID)
        if (!product) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json({product})
    }
}
