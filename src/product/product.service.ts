import { Injectable, NotFoundException } from '@nestjs/common';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interfaces';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}
    
    async getProducts(): Promise<Product[]>{
         const product = await this.productModel.find()
         return product
    }

    async getProduct(productId: string): Promise<Product>{
        try {
        const product = await this.productModel.findById(productId)
        return product
            
        } catch (error) {
            throw new NotFoundException(error.message)
        }
   }

    async deleteProduct(productId: string): Promise<Product>{
        const deletedProduct = await this.productModel.findByIdAndDelete(productId);
        return deletedProduct;
    }
    async updateProduct(productId: string, createProductDTO: CreateProductDto): Promise<Product>{
        const updatedProduct = await this.productModel.findByIdAndUpdate(productId,createProductDTO, {new:true});
        return await updatedProduct.save()
        
    }
    async createProduct(createProductDTO: CreateProductDto) : Promise<Product>{
        const product = new this.productModel(createProductDTO)
        return await product.save()
        
    }
}
