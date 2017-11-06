import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Contentful/Page/presenter'
import ContactPoint from '../../../../components/Contentful/ContactPoint'

const setup = (cfPageEntry) => {
  return shallow(<PagePresenter cfPageEntry={cfPageEntry} />)
}

let enzymeWrapper
describe('components/Contentful/Page/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      fields: {
        title: 'Fake Title',
        shortContent: 'Fake short content',
        body: 'Fake content',
        image: 'Fake image',
        relatedResources: ['Fake related resources'],
        relatedServices: ['Fake related services'],
        libguides: ['Fake related libguides'],
        searchPanelOpen: false,
      },
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a top level div with correct class name', () => {
    expect(enzymeWrapper.is('.container-fluid')).toBe(true)
  })

  it('should renders the title of the content', () => {
    let header = '<header><div><h1 class="page-title" id="main-page-title">Fake Title</h1><hr aria-hidden="true"/></div></header>'
    expect(enzymeWrapper.find('header').html()).toBe(header)
  })

  it('should render LibMarkdown for content', () => {
    expect(enzymeWrapper.find('LibMarkdown').children().node).toBe('Fake content')
  })

  it('should render Related for related resources', () => {
    expect(enzymeWrapper.find('Related').someWhere(n => n.children().node === 'Fake related resources')).toBe(true)
  })

  it('should render Related for related services', () => {
    expect(enzymeWrapper.find('Related').someWhere(n => n.children().node === 'Fake related services')).toBe(true)
  })

  it('should render Related for libguides', () => {
    expect(enzymeWrapper.find('Related').someWhere(n => n.children().node === 'Fake related libguides')).toBe(true)
  })

  it('should render ContactPoint twice', () => {
    expect(enzymeWrapper.find('ContactPoint').length).toBe(2)
  })
})
