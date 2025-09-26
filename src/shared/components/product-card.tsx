import React from 'react'
import { Box, Button, Typography } from '@mui/material'

function ProductCard({ product }: { product: any }) {
  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: 2,
        p: 1,
        textAlign: 'center',
      }}
    >
      <img
        src={product.images[0] ?? '/placeholder.jpg'}
        alt={product.name}
        style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
      />
      <Typography variant="subtitle1">{product.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
      <Typography fontWeight="bold" sx={{ mt: 1 }}>
        {Number(product.price).toLocaleString()} UZS
      </Typography>
      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 1, textTransform: 'none' }}
      >
        Add
      </Button>
    </Box>
  )
}

export default ProductCard
