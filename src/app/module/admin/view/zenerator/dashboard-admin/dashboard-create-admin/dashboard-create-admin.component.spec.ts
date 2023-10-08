import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCreateAdminComponent } from './dashboard-create-admin.component';

describe('DashboardCreateAdminComponent', () => {
  let component: DashboardCreateAdminComponent;
  let fixture: ComponentFixture<DashboardCreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCreateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
