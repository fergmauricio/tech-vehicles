export const VehicleRepositoryMock = () => ({
  existsByPlaca: jest.fn(),
  existsByRenavam: jest.fn(),
  existsByChassi: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findById: jest.fn(),
});
