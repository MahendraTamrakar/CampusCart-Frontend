import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const form = new formidable.IncomingForm()
  form.uploadDir = './public/uploads'
  form.keepExtensions = true

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err)
      return res.status(500).json({ message: 'Error processing form data' })
    }

    try {
      // Process the product details
      const productDetails = {
        productName: fields.productName,
        brandName: fields.brandName,
        description: fields.description,
        price: parseFloat(fields.price as string),
        quantity: parseInt(fields.quantity as string),
        images: [],
      }

      // Process uploaded images
      const imageFiles = files.image as formidable.File[]
      if (Array.isArray(imageFiles)) {
        productDetails.images = imageFiles.map(file => ({
          filename: file.newFilename,
          path: file.filepath.replace('public', ''),
        }))
      } else if (imageFiles) {
        productDetails.images.push({
          filename: imageFiles.newFilename,
          path: imageFiles.filepath.replace('public', ''),
        })
      }

      // Here you would typically save the product details to your database
      // For this example, we'll just log it
      console.log('Saving product:', productDetails)

      // Simulate a delay for database operation
      await new Promise(resolve => setTimeout(resolve, 1000))

      res.status(200).json({ message: 'Product added successfully', product: productDetails })
    } catch (error) {
      console.error('Error processing product:', error)
      res.status(500).json({ message: 'Error saving product' })
    }
  })
}

