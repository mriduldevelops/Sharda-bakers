import { DocumentTextIcon, } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const cakeType = defineType({
    name: 'cake',
    title: 'Cakes',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'weight',
            title: 'Weight',
            type: 'string',
            options: {
                list: [
                    { title: '1kg', value: '1kg' },
                    { title: '1/2kg', value: '1/2kg' },
                    { title: '2kg', value: '2kg' },
                    { title: '3kg', value: '3kg' },
                    { title: '5kg', value: '5kg' },
                ],
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'categories',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'discountedPrice',
            title: 'Discounted Price',
            type: 'number',
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: 'originalPrice',
            title: 'Original Price',
            type: 'number',
            validation: Rule => Rule.required().min(1),
        }),
    ]
})
