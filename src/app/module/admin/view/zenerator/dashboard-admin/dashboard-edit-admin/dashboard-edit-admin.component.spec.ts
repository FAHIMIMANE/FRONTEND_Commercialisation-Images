import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEditAdminComponent } from './dashboard-edit-admin.component';

describe('DashboardEditAdminComponent', () => {
  let component: DashboardEditAdminComponent;
  let fixture: ComponentFixture<DashboardEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
