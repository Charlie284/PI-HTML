import hashlib
import unittest
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
PI_PATH = REPOSITORY_ROOT / "Pi.txt"


class PiDataTests(unittest.TestCase):
    def test_dataset_contains_exactly_ten_million_decimal_digits(self):
        digits = PI_PATH.read_text(encoding="ascii")

        self.assertEqual(len(digits), 10_000_000)
        self.assertTrue(digits.isascii())
        self.assertTrue(digits.isdecimal())
        self.assertTrue(digits.startswith("14159265358979323846"))

    def test_dataset_checksum_matches_the_verified_reference(self):
        digest = hashlib.sha256(PI_PATH.read_bytes()).hexdigest()

        self.assertEqual(
            digest,
            "c3d3dd4bd5d1051fd5995db983eb898ac0308189a20c46e80e5f67d5f415edf1",
        )


if __name__ == "__main__":
    unittest.main()
