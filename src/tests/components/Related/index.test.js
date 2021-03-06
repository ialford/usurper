import React from 'react'
import Related from 'components/Contentful/Related'
import { shallow } from 'enzyme'
import Link from 'components/Interactive/Link'
import Image from 'components/Image'

let enzymeWrapper
const setup = (props) => {
  return shallow(<Related {...props} />)
}

describe('components/Contentful/Related/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with children', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        children: [
          {
            sys: {
              id: "id",
            },
            fields: {
              slug: 'foo',
              image: 'fooImage',
              title: 'fooTitle',
            },
          },
          {
            sys: {
              id: "id",
            },
            fields: {
              url: 'bar',
              image: 'barImage',
              title: 'barTitle',
            },
          },
        ],
      })
    })

    it('should render all children as li elements', () => {
      expect(enzymeWrapper.find('li').length).toBe(2)
    })

    it('should render all childrens links', () => {
      expect(enzymeWrapper.findWhere(n => n.type() === Link && n.props().to === '/foo').exists()).toBe(true)
      expect(enzymeWrapper.findWhere(n => n.type() === Link && n.props().to === 'bar').exists()).toBe(true)
    })

    it('should render all childrens images', () => {
      expect(enzymeWrapper.findWhere(n => n.type() === Image && n.props().cfImage === 'fooImage').exists()).toBe(true)
      expect(enzymeWrapper.findWhere(n => n.type() === Image && n.props().cfImage === 'barImage').exists()).toBe(true)
    })

    it('should render all childrens titles', () => {

      expect(enzymeWrapper.findWhere(n => n.type() === 'span' && n.props().children === 'fooTitle').exists()).toBe(true)
      expect(enzymeWrapper.findWhere(n => n.type() === 'span' && n.text() === 'barTitle').exists()).toBe(true)
    })
  })

  describe('with no children', () => {
    beforeEach(() => {
      enzymeWrapper = setup({})
    })

    it('should render null', () => {
      expect(enzymeWrapper.equals(null)).toBe(true)
    })
  })
})
