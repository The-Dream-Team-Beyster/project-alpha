const Location = require('../../../models/Location')
const db = require('../../../db/connect')

describe('Location', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe ('getAllCountries', () => {
    it('resolves with goats on successful db query', async () => {
      // Arrange
      const mockCountries = [
        { id: 1, country_id: 'FC', name: 'fakeCountry', funFact: 'I love backend testing :)' },
        { id: 2, country_id: 'NC', name: 'notACountry', funFact: 'I love backend testing :)' },
        { id: 3, country_id: 'PC', name: 'phonyCountry', funFact: 'this countrys a phony! a great big phony!' },
      ];
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockCountries });

      // Act
      const locations = await Location.getAllCountries();

      // Assert
      expect(locations).toHaveLength(3);
      expect(locations[0]).toHaveProperty('id');
      expect(locations[0].name).toBe('fakeCountry');
      expect(db.query).toHaveBeenCalledWith("SELECT name, country_id, funFact FROM countries;");
    });

    it('should throw an Error when no countries are found', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(Location.getAllCountries()).rejects.toThrow("No Countries Found");
    });
  })

  describe ('getRandomCountry', () => {
    it('resolves with goat on successful db query', async () => {
      // Arrange
      const testCountry = { id: 1, country_id: 'mc', name: 'mockCountry', funFact: 'test' };
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testCountry] });

      // Act
      const result = await Location.getRandomCountry();

      // Assert
      expect(result.rows[0].name).toBe('mockCountry');
      expect(result.rows[0].country_id).toBe('mc');
      expect(db.query).toHaveBeenCalledWith("SELECT name FROM countries ORDER BY RAND() LIMIT 1;");    
    });

    it('should throw an Error when country is not found', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // Act & Assert
      await expect(Location.getRandomCountry()).rejects.toThrow("No Location Found");
    });
  })
})
