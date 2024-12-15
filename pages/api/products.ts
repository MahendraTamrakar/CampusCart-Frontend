import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File, Fields, Files } from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface ProductImage {
  filename: string
  path: string
}

interface ProductDetails {
  productName: string
  brandName?: string
  description?: string
  price: number
  quantity: number
  images: ProductImage[]
}

const parseForm = (req: NextApiRequest): Promise<{
  fields: Fields
  files: Files
}> => {
  const form = new formidable.IncomingForm({
    uploadDir: './public/uploads',
    keepExtensions: true,
  })
  return new Promise((resolve, reject) => {
    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { fields, files } = await parseForm(req)

    // Validate required fields
    const productName = Array.isArray(fields.productName)
      ? fields.productName[0]
      : fields.productName

    if (!productName) {
      return res.status(400).json({ message: 'Product name is required' })
    }

    const brandName = Array.isArray(fields.brandName)
      ? fields.brandName[0]
      : fields.brandName

    const description = Array.isArray(fields.description)
      ? fields.description[0]
      : fields.description

    const price = parseFloat(
      Array.isArray(fields.price) ? fields.price[0] : (fields.price as string)
    )

    const quantity = parseInt(
      Array.isArray(fields.quantity)
        ? fields.quantity[0]
        : (fields.quantity as string)
    )

    if (isNaN(price) || isNaN(quantity)) {
      return res.status(400).json({ message: 'Invalid price or quantity' })
    }

    // Process uploaded files
    const productImages: ProductImage[] = []
    const imageFiles = files.image as File | File[]

    if (Array.isArray(imageFiles)) {
      imageFiles.forEach((file) => {
        productImages.push({
          filename: file.newFilename,
          path: file.filepath.replace(/^public/, ''), // Ensure consistent public path
        })
      })
    } else if (imageFiles) {
      productImages.push({
        filename: imageFiles.newFilename,
        path: imageFiles.filepath.replace(/^public/, ''),
      })
    }

    const productDetails: ProductDetails = {
      productName,
      brandName,
      description,
      price,
      quantity,
      images: productImages,
    }

    // Simulate database save
    console.log('Saving product:', productDetails)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay

    res.status(200).json({ message: 'Product added successfully', product: productDetails })
  } catch (error) {
    console.error('Error processing product:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
