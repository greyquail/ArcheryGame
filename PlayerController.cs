using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public GameObject bow;
    public GameObject arrowPrefab;
    public Transform arrowSpawnPoint;
    public float arrowSpeed = 30f;
    private int arrowsLeft = 5;
    private int score = 0;

    void Update()
    {
        // Rotate bow to face the mouse cursor
        RotateBow();

        // Shoot arrow when the left mouse button is clicked
        if (Input.GetMouseButtonDown(0) && arrowsLeft > 0)
        {
            ShootArrow();
            arrowsLeft--;
        }
    }

    void RotateBow()
    {
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out RaycastHit hit))
        {
            Vector3 lookDirection = hit.point - bow.transform.position;
            Quaternion lookRotation = Quaternion.LookRotation(lookDirection);
            bow.transform.rotation = Quaternion.Euler(0, lookRotation.eulerAngles.y, 0);
        }
    }

    void ShootArrow()
    {
        GameObject arrowInstance = Instantiate(arrowPrefab, arrowSpawnPoint.position, arrowSpawnPoint.rotation);
        Rigidbody rb = arrowInstance.GetComponent<Rigidbody>();
        rb.velocity = arrowSpawnPoint.forward * arrowSpeed;
    }

    public void AddScore(int points)
    {
        score += points;
    }

    public int GetScore()
    {
        return score;
    }

    public int GetArrowsLeft()
    {
        return arrowsLeft;
    }
}
