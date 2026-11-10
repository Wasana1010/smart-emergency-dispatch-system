package com.emergency.system.algorithm.hospital;

import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.Hospital;
import com.emergency.system.entity.HospitalStatus;
import com.emergency.system.entity.PatientCondition;
import com.emergency.system.repository.HospitalRepository;
import com.emergency.system.service.HospitalSelectionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.lang.reflect.Field;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class HospitalSelectionTest {

    @Test
    void testCriticalPatientPrefersIcuAvailability() throws Exception {
        HospitalRepository repoMock = Mockito.mock(HospitalRepository.class);

        Hospital h1 = new Hospital();
        h1.setId(1L);
        h1.setName("General Hospital");
        h1.setLatitude(6.90);
        h1.setLongitude(79.85);
        h1.setStatus(HospitalStatus.AVAILABLE);
        h1.setAvailableEmergencyBeds(10);
        h1.setAvailableIcuBeds(0); // No ICU beds

        Hospital h2 = new Hospital();
        h2.setId(2L);
        h2.setName("Medical Center ICU");
        h2.setLatitude(6.95);
        h2.setLongitude(79.90);
        h2.setStatus(HospitalStatus.AVAILABLE);
        h2.setAvailableEmergencyBeds(5);
        h2.setAvailableIcuBeds(3); // Has ICU beds

        when(repoMock.findAll()).thenReturn(Arrays.asList(h1, h2));

        HospitalSelectionService service = new HospitalSelectionService();
        // inject mock repository via reflection
        Field repoField = HospitalSelectionService.class.getDeclaredField("hospitalRepository");
        repoField.setAccessible(true);
        repoField.set(service, repoMock);

        Emergency emergency = new Emergency();
        emergency.setPatientCondition(PatientCondition.CRITICAL);

        HospitalSelectionResult result = service.selectBestHospital(emergency, 6.92, 79.87);

        assertTrue(result.isSuccessful());
        assertNotNull(result.getSelectedHospital());
        assertEquals(2L, result.getSelectedHospital().getId());
    }
}