const locationController = require('../../../controllers/locations')
const Location = require('../../../models/Location')

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };


describe('Locations controller', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('getAll', () => {
    it('should return goats with a status code 200', async () => {
      const testLocations = ['g1', 'g2']
      jest.spyOn(Location, 'getAllCountries').mockResolvedValue(testLocations)

      await locationController.getAll(null, mockRes)
      
      expect(Location.getAllCountries).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
    })

    it('should return an error upon failure', async () => {
      jest.spyOn(Location, 'getAllCountries').mockRejectedValue(new Error("No Countries Found"))

      await locationController.getAll(null, mockRes)
      
      expect(Location.getAllCountries).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
    })
  })

  describe ('getCountry', () => {
    let testCountry, mockReq;

    beforeEach(() => {
      testCountry = { id: 1, country_id: 'TC', name: 'Test Country', funFact: 'test' }
    });

    it('should return a goat with a 200 status code', async () => {
      jest.spyOn(Location, 'getRandomCountry').mockResolvedValue(new Location(testCountry))

      await locationController.getCountry(mockReq, mockRes);
      
      expect(Location.getRandomCountry).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
    })

    it('should return an error if the goat is not found', async () => {
      jest.spyOn(Location, 'getRandomCountry').mockRejectedValue(new Error('oh no'))

      await locationController.getCountry(mockReq, mockRes)
      
      expect(Location.getRandomCountry).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
    })
  })
})