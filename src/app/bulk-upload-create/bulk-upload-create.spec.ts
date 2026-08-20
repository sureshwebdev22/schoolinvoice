import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadCreate } from './bulk-upload-create';

describe('BulkUploadCreate', () => {
  let component: BulkUploadCreate;
  let fixture: ComponentFixture<BulkUploadCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkUploadCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(BulkUploadCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
